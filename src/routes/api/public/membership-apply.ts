import * as React from 'react'
import { createClient } from '@supabase/supabase-js'
import { render } from '@react-email/components'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { TEMPLATES } from '@/lib/email-templates/registry'

const SITE_NAME = 'Grafted Exchange'
const SENDER_DOMAIN = 'notify.graftedexchange.ca'
const FROM_DOMAIN = 'graftedexchange.ca'
const TEMPLATE_NAME = 'membership-application'

const schema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  businessName: z.string().trim().min(1).max(200),
  websiteOrSocial: z.string().trim().max(300).optional().or(z.literal('')),
  businessSize: z.string().trim().min(1).max(100),
  interest: z.string().trim().min(1).max(100),
  message: z.string().trim().min(1).max(2000),
  consent: z.literal(true),
})

function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export const Route = createFileRoute('/api/public/membership-apply')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const supabaseUrl =
          process.env.SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
        if (!supabaseUrl || !serviceKey) {
          return Response.json(
            { error: 'Server configuration error' },
            { status: 500 },
          )
        }

        let payload: z.infer<typeof schema>
        try {
          const body = await request.json()
          payload = schema.parse(body)
        } catch (err) {
          return Response.json(
            { error: 'Invalid submission' },
            { status: 400 },
          )
        }

        const supabase = createClient(supabaseUrl, serviceKey)

        // 1. Persist the application
        const { data: inserted, error: insertError } = await supabase
          .from('membership_applications')
          .insert({
            first_name: payload.firstName,
            last_name: payload.lastName,
            email: payload.email,
            phone: payload.phone || null,
            business_name: payload.businessName,
            website_or_social: payload.websiteOrSocial || null,
            business_size: payload.businessSize,
            interest: payload.interest,
            message: payload.message,
            consent: payload.consent,
          })
          .select('id, created_at')
          .single()

        if (insertError || !inserted) {
          console.error('Failed to save membership application', insertError)
          return Response.json(
            { error: 'Could not save your submission. Please try again.' },
            { status: 500 },
          )
        }

        // 2. Render + enqueue notification email to the site owner
        const template = TEMPLATES[TEMPLATE_NAME]
        if (!template || !template.to) {
          console.error('Membership notification template missing')
          return Response.json({ success: true, queued: false })
        }

        const recipient = template.to
        const templateData = {
          ...payload,
          submittedAt: new Date(inserted.created_at).toLocaleString('en-CA', {
            timeZone: 'America/Toronto',
          }),
        }

        try {
          const messageId = `membership-${inserted.id}`
          const element = React.createElement(template.component, templateData)
          const html = await render(element)
          const text = await render(element, { plainText: true })
          const subject =
            typeof template.subject === 'function'
              ? template.subject(templateData)
              : template.subject

          // Ensure unsubscribe token exists for the recipient (required by queue processor)
          const normalizedRecipient = recipient.toLowerCase()
          let unsubscribeToken: string
          const { data: existing } = await supabase
            .from('email_unsubscribe_tokens')
            .select('token, used_at')
            .eq('email', normalizedRecipient)
            .maybeSingle()
          if (existing && !existing.used_at) {
            unsubscribeToken = existing.token
          } else {
            unsubscribeToken = generateToken()
            await supabase
              .from('email_unsubscribe_tokens')
              .upsert(
                { token: unsubscribeToken, email: normalizedRecipient },
                { onConflict: 'email', ignoreDuplicates: true },
              )
            const { data: stored } = await supabase
              .from('email_unsubscribe_tokens')
              .select('token')
              .eq('email', normalizedRecipient)
              .maybeSingle()
            if (stored?.token) unsubscribeToken = stored.token
          }

          await supabase.from('email_send_log').insert({
            message_id: messageId,
            template_name: TEMPLATE_NAME,
            recipient_email: recipient,
            status: 'pending',
          })

          const { error: enqueueError } = await supabase.rpc('enqueue_email', {
            queue_name: 'transactional_emails',
            payload: {
              message_id: messageId,
              to: recipient,
              from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
              sender_domain: SENDER_DOMAIN,
              subject,
              html,
              text,
              purpose: 'transactional',
              label: TEMPLATE_NAME,
              idempotency_key: messageId,
              unsubscribe_token: unsubscribeToken,
              queued_at: new Date().toISOString(),
            },
          })

          if (enqueueError) {
            console.error('Failed to enqueue notification email', enqueueError)
            await supabase.from('email_send_log').insert({
              message_id: messageId,
              template_name: TEMPLATE_NAME,
              recipient_email: recipient,
              status: 'failed',
              error_message: 'Failed to enqueue notification email',
            })
          }
        } catch (err) {
          console.error('Notification email pipeline error', err)
        }

        return Response.json({ success: true, id: inserted.id })
      },
    },
  },
})