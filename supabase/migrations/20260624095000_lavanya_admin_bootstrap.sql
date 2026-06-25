-- Temporary admin bootstrap for Lavanya.
-- After this migration is applied, signing up with this email becomes an admin account.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  assigned_role public.app_role;
BEGIN
  assigned_role := CASE
    WHEN lower(NEW.email) = 'lavanya.boga@lavishgrand.com' THEN 'admin'::public.app_role
    ELSE 'customer'::public.app_role
  END;

  INSERT INTO public.profiles (id, full_name, email, phone, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    NEW.phone,
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    email = EXCLUDED.email,
    phone = EXCLUDED.phone,
    avatar_url = EXCLUDED.avatar_url;

  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, assigned_role)
  ON CONFLICT (user_id) DO UPDATE SET role = EXCLUDED.role;

  RETURN NEW;
END; $$;

INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE lower(email) = 'lavanya.boga@lavishgrand.com'
ON CONFLICT (user_id) DO UPDATE SET role = EXCLUDED.role;

UPDATE public.profiles
SET full_name = 'LAVANYA BOGA'
WHERE lower(email) = 'lavanya.boga@lavishgrand.com';
