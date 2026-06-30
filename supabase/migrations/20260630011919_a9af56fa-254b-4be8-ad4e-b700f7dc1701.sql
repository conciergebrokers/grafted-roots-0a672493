CREATE TABLE IF NOT EXISTS public.member_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  first_name text,
  last_name text,
  business_name text,
  email text UNIQUE NOT NULL,
  mobile_phone text,
  public_directory_consent boolean NOT NULL DEFAULT false,
  account_status text NOT NULL DEFAULT 'pending_payment'
    CHECK (account_status IN ('pending_payment','pending_profile','active','past_due','cancelled')),
  signup_date timestamptz NOT NULL DEFAULT now(),
  profile_complete boolean NOT NULL DEFAULT false,
  payment_status text NOT NULL DEFAULT 'stripe_placeholder',
  founding_member boolean NOT NULL DEFAULT false,
  stripe_customer_id text,
  stripe_subscription_id text,
  business_category text,
  business_category_other text,
  one_line_description text,
  city_service_area text,
  city_service_area_visibility text NOT NULL DEFAULT 'public'
    CHECK (city_service_area_visibility IN ('public','member-only')),
  logo_url text,
  headshot_url text,
  headshot_visibility text NOT NULL DEFAULT 'public'
    CHECK (headshot_visibility IN ('public','member-only')),
  what_i_do_differently text,
  ideal_referral text,
  website_url text,
  social_links text,
  what_drew_you_to_grafted text,
  stage_of_business text,
  annual_revenue text,
  number_of_employees integer,
  salesperson_own_book boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.member_profiles TO authenticated;
GRANT INSERT ON public.member_profiles TO anon;
GRANT ALL ON public.member_profiles TO service_role;

ALTER TABLE public.member_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Members can view their own profile" ON public.member_profiles;
CREATE POLICY "Members can view their own profile"
  ON public.member_profiles FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR email = auth.email());

DROP POLICY IF EXISTS "Members can insert their own profile" ON public.member_profiles;
CREATE POLICY "Members can insert their own profile"
  ON public.member_profiles FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id OR email = auth.email());

DROP POLICY IF EXISTS "Members can update their own profile" ON public.member_profiles;
CREATE POLICY "Members can update their own profile"
  ON public.member_profiles FOR UPDATE TO authenticated
  USING (auth.uid() = user_id OR email = auth.email())
  WITH CHECK (auth.uid() = user_id OR email = auth.email());

DROP POLICY IF EXISTS "Visitors can start placeholder signup" ON public.member_profiles;
CREATE POLICY "Visitors can start placeholder signup"
  ON public.member_profiles FOR INSERT TO anon
  WITH CHECK (public_directory_consent = true AND account_status = 'pending_payment');

CREATE OR REPLACE FUNCTION public.update_member_profiles_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

DROP TRIGGER IF EXISTS update_member_profiles_updated_at ON public.member_profiles;
CREATE TRIGGER update_member_profiles_updated_at
  BEFORE UPDATE ON public.member_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_member_profiles_updated_at();