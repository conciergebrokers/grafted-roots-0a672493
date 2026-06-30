DROP POLICY IF EXISTS "Visitors can start placeholder signup" ON public.member_profiles;
REVOKE INSERT ON public.member_profiles FROM anon;