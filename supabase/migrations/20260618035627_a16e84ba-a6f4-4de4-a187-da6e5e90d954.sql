DROP POLICY IF EXISTS "Authenticated users can view applications" ON public.membership_applications;
REVOKE SELECT ON public.membership_applications FROM authenticated, anon;
CREATE POLICY "Service role can read applications" ON public.membership_applications FOR SELECT USING (auth.role() = 'service_role');