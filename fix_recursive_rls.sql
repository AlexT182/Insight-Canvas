-- Function to check if user is admin (bypassing RLS)
-- SECURITY DEFINER allows this function to run with the privileges of the creator (postgres/admin),
-- bypassing the RLS on the profiles table that causes the infinite loop.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update app_config policies to avoid recursion
DROP POLICY IF EXISTS "Admins can update config" ON public.app_config;
DROP POLICY IF EXISTS "Admins can insert config" ON public.app_config;

-- Policy: Only Admins can update config (using safe function)
CREATE POLICY "Admins can update config" ON public.app_config
    FOR UPDATE USING (
        public.is_admin()
    );

-- Policy: Only Admins can insert config (using safe function)
CREATE POLICY "Admins can insert config" ON public.app_config
    FOR INSERT WITH CHECK (
        public.is_admin()
    );
