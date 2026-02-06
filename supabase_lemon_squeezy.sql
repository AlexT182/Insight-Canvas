-- Rename stripe_customer_id to lemon_squeezy_customer_id or just add a new column
-- For safety, we will add a new column and keep the old one for now, or just rename if it's empty.
-- Since we just created it, we can rename it.

DO $$
BEGIN
  IF EXISTS(SELECT *
    FROM information_schema.columns
    WHERE table_name = 'profiles' and column_name = 'stripe_customer_id')
  THEN
      ALTER TABLE public.profiles RENAME COLUMN stripe_customer_id TO lemon_squeezy_customer_id;
  END IF;
END $$;

-- Add a column for storing the subscription_id from Lemon Squeezy
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS lemon_squeezy_subscription_id text;

-- Update the comments/documentation via SQL if needed
COMMENT ON COLUMN public.profiles.lemon_squeezy_customer_id IS 'Customer ID from Lemon Squeezy';
