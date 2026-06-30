
DROP POLICY IF EXISTS "Members can view their own profile" ON public.member_profiles;
DROP POLICY IF EXISTS "Members can update their own profile" ON public.member_profiles;
DROP POLICY IF EXISTS "Members can insert their own profile" ON public.member_profiles;

CREATE POLICY "Members can view their own profile"
  ON public.member_profiles
  FOR SELECT
  TO authenticated
  USING (user_id IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Members can update their own profile"
  ON public.member_profiles
  FOR UPDATE
  TO authenticated
  USING (user_id IS NOT NULL AND auth.uid() = user_id)
  WITH CHECK (user_id IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Members can insert their own profile"
  ON public.member_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id IS NOT NULL AND auth.uid() = user_id);
