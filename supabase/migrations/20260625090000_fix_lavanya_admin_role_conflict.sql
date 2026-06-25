INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE lower(email) = 'lavanya.boga@lavishgrand.com'
ON CONFLICT (user_id) DO UPDATE SET role = EXCLUDED.role;
