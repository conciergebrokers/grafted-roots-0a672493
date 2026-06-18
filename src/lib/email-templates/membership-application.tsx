import React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  businessName?: string
  websiteOrSocial?: string
  businessSize?: string
  interest?: string
  message?: string
  submittedAt?: string
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'Georgia, "Times New Roman", serif',
  color: '#1f2937',
}
const container = { padding: '32px 28px', maxWidth: '600px' }
const eyebrow = {
  fontFamily: 'Arial, sans-serif',
  fontSize: '11px',
  letterSpacing: '0.18em',
  textTransform: 'uppercase' as const,
  color: '#7c6b3f',
  margin: '0 0 8px',
}
const heading = { fontSize: '22px', color: '#0f2a3d', margin: '0 0 16px' }
const label = {
  fontFamily: 'Arial, sans-serif',
  fontSize: '11px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  color: '#6b7280',
  margin: '14px 0 2px',
}
const value = {
  fontFamily: 'Arial, sans-serif',
  fontSize: '14px',
  color: '#0f2a3d',
  margin: '0',
  lineHeight: '1.5',
}
const messageBox = {
  ...value,
  whiteSpace: 'pre-wrap' as const,
  background: '#f5f1e6',
  padding: '14px 16px',
  borderRadius: '8px',
  borderLeft: '3px solid #c8a96a',
  marginTop: '4px',
}
const divider = { borderColor: '#e5e7eb', margin: '24px 0' }

const MembershipApplicationEmail = ({
  firstName,
  lastName,
  email,
  phone,
  businessName,
  websiteOrSocial,
  businessSize,
  interest,
  message,
  submittedAt,
}: Props) => {
  const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'Someone'
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>New Grafted inquiry from {fullName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={eyebrow}>Grafted Exchange</Text>
          <Heading style={heading}>New inquiry from {fullName}</Heading>
          <Text style={value}>
            A new submission has come in through the contact form.
          </Text>

          <Hr style={divider} />

          <Section>
            <Text style={label}>Interest</Text>
            <Text style={value}>{interest || '—'}</Text>

            <Text style={label}>Name</Text>
            <Text style={value}>{fullName}</Text>

            <Text style={label}>Email</Text>
            <Text style={value}>{email || '—'}</Text>

            {phone ? (
              <>
                <Text style={label}>Phone</Text>
                <Text style={value}>{phone}</Text>
              </>
            ) : null}

            <Text style={label}>Business</Text>
            <Text style={value}>{businessName || '—'}</Text>

            {websiteOrSocial ? (
              <>
                <Text style={label}>Website / social</Text>
                <Text style={value}>{websiteOrSocial}</Text>
              </>
            ) : null}

            <Text style={label}>Business size</Text>
            <Text style={value}>{businessSize || '—'}</Text>

            <Text style={label}>Message</Text>
            <Text style={messageBox}>{message || '—'}</Text>
          </Section>

          <Hr style={divider} />

          <Text style={{ ...value, fontSize: '12px', color: '#6b7280' }}>
            Submitted {submittedAt || 'just now'}.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: MembershipApplicationEmail,
  subject: (data: Record<string, any>) => {
    const name = [data.firstName, data.lastName].filter(Boolean).join(' ')
    return `New Grafted inquiry${name ? ` — ${name}` : ''}`
  },
  displayName: 'Membership / contact inquiry',
  to: 'info@graftedexchange.ca',
  previewData: {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@example.com',
    phone: '555-123-4567',
    businessName: 'Acme Consulting',
    websiteOrSocial: 'https://acme.example.com',
    businessSize: '1 to 3 employees',
    interest: 'Applying for membership',
    message: 'I would love to learn more about Grafted and visit a meeting.',
    submittedAt: 'just now',
  },
} satisfies TemplateEntry