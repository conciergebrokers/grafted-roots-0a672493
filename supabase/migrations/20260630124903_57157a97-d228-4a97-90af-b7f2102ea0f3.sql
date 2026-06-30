DROP POLICY IF EXISTS "Members can view their own profile" ON public.member_profiles;
DROP POLICY IF EXISTS "Members can update their own profile" ON public.member_profiles;

CREATE POLICY "Members can view their own profile"
  ON public.member_profiles
  FOR SELECT
  TO authenticated
  USING (
    (user_id IS NOT NULL AND auth.uid() = user_id)
    OR (user_id IS NULL AND email IS NOT NULL AND lower(email) = lower(auth.email()))
  );

CREATE POLICY "Members can update their own profile"
  ON public.member_profiles
  FOR UPDATE
  TO authenticated
  USING (
    (user_id IS NOT NULL AND auth.uid() = user_id)
    OR (user_id IS NULL AND email IS NOT NULL AND lower(email) = lower(auth.email()))
  )
  WITH CHECK (
    (user_id IS NOT NULL AND auth.uid() = user_id)
    OR (user_id IS NULL AND email IS NOT NULL AND lower(email) = lower(auth.email()))
  );