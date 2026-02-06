-- 1. Sync missing profiles from auth.users
-- This inserts a profile for any user in auth.users that doesn't have one in public.profiles
INSERT INTO public.profiles (id, email)
SELECT id, email
FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- 2. Set Admin Role for specific users
-- Update taminhquan182@gmail.com
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'taminhquan182@gmail.com';

-- Update anhtam.n@gmail.com
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'anhtam.n@gmail.com';

-- 3. Verify the changes (Optional, for your view)
SELECT email, role, subscription_status FROM public.profiles;
