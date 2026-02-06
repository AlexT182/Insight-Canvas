-- Add role column to profiles if it doesn't exist
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS role text DEFAULT 'user' CHECK (role IN ('user', 'admin'));

-- Create app_config table for dynamic settings
CREATE TABLE IF NOT EXISTS public.app_config (
    key text PRIMARY KEY,
    value text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert default pro price
INSERT INTO public.app_config (key, value)
VALUES ('pro_monthly_price', '4.9')
ON CONFLICT (key) DO NOTHING;

-- Enable RLS on app_config
ALTER TABLE public.app_config ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can read config
CREATE POLICY "Public read access" ON public.app_config
    FOR SELECT USING (true);

-- Policy: Only Admins can update config
CREATE POLICY "Admins can update config" ON public.app_config
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

-- Policy: Only Admins can insert config (optional)
CREATE POLICY "Admins can insert config" ON public.app_config
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );
