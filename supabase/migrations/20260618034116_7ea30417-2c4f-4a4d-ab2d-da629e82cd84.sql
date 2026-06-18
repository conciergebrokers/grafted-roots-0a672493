CREATE TABLE public.membership_applications (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  business_name text NOT NULL,
  website_or_social text,
  business_size text NOT NULL,
  interest text NOT NULL,
  message text NOT NULL,
  consent boolean NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT INSERT ON public.membership_applications TO anon;
GRANT INSERT, SELECT ON public.membership_applications TO authenticated;
GRANT ALL ON public.membership_applications TO service_role;

ALTER TABLE public.membership_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit applications"
ON public.membership_applications
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can view applications"
ON public.membership_applications
FOR SELECT
TO authenticated
USING (true);