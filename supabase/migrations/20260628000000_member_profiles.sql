create table if not exists public.member_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  first_name text,
  last_name text,
  business_name text,
  email text unique not null,
  mobile_phone text,
  public_directory_consent boolean not null default false,
  account_status text not null default 'pending_payment' check (account_status in ('pending_payment', 'pending_profile', 'active', 'past_due', 'cancelled')),
  signup_date timestamptz not null default now(),
  profile_complete boolean not null default false,
  payment_status text not null default 'stripe_placeholder',
  founding_member boolean not null default false,
  stripe_customer_id text,
  stripe_subscription_id text,
  business_category text,
  business_category_other text,
  one_line_description text,
  city_service_area text,
  city_service_area_visibility text not null default 'public' check (city_service_area_visibility in ('public', 'member-only')),
  logo_url text,
  headshot_url text,
  headshot_visibility text not null default 'public' check (headshot_visibility in ('public', 'member-only')),
  what_i_do_differently text,
  ideal_referral text,
  website_url text,
  social_links text,
  what_drew_you_to_grafted text,
  stage_of_business text,
  annual_revenue text,
  number_of_employees integer,
  salesperson_own_book boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.member_profiles enable row level security;

create policy "Members can view their own profile"
on public.member_profiles
for select
to authenticated
using (auth.uid() = user_id or email = auth.email());

create policy "Members can insert their own profile"
on public.member_profiles
for insert
to authenticated
with check (auth.uid() = user_id or email = auth.email());

create policy "Members can update their own profile"
on public.member_profiles
for update
to authenticated
using (auth.uid() = user_id or email = auth.email())
with check (auth.uid() = user_id or email = auth.email());

create policy "Visitors can start placeholder signup"
on public.member_profiles
for insert
to anon
with check (public_directory_consent = true and account_status = 'pending_payment');

create or replace function public.update_member_profiles_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists update_member_profiles_updated_at on public.member_profiles;
create trigger update_member_profiles_updated_at
before update on public.member_profiles
for each row
execute function public.update_member_profiles_updated_at();
