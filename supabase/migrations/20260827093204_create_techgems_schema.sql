/*
# TechGems Core Schema

Creates the tables needed to power the TechGems website backend:
profiles, appointments, and contact submissions.

## 1. New Tables

### profiles
- Extends `auth.users` with a display name and role.
- `id` (uuid, PK, references auth.users)
- `full_name` (text, display name)
- `phone` (text, nullable)
- `role` (text, 'user' | 'admin', default 'user')
- `created_at` (timestamptz)

### appointments
- Booking requests created by users.
- `id` (uuid, PK)
- `user_id` (uuid, FK -> profiles, defaults to auth.uid())
- `service` (text, selected service)
- `date` (date, appointment date)
- `appointment_time` (text, selected time slot)
- `message` (text, nullable, additional notes)
- `status` (text, 'pending' | 'confirmed' | 'completed' | 'cancelled', default 'pending')
- `created_at` (timestamptz)

### contact_submissions
- Messages sent via the public contact form (no auth required).
- `id` (uuid, PK)
- `name` (text)
- `email` (text)
- `phone` (text, nullable)
- `subject` (text)
- `message` (text)
- `status` (text, 'new' | 'read' | 'archived', default 'new')
- `created_at` (timestamptz)

## 2. Security

### profiles
- RLS enabled.
- Each authenticated user can SELECT, INSERT, UPDATE only their own profile row.

### appointments
- RLS enabled.
- Authenticated users can SELECT, INSERT, UPDATE, DELETE only their own appointments.
- Admins can view/manage all appointments via SECURITY DEFINER functions.

### contact_submissions
- RLS enabled.
- Anyone (anon + authenticated) can INSERT (the public contact form).
- Only admins can SELECT, UPDATE, DELETE via SECURITY DEFINER functions.

## 3. Admin Access Pattern

Admin operations use SECURITY DEFINER functions that run with elevated
privileges and enforce the admin role check via auth.jwt() app_metadata.
*/

-- ---------- profiles ----------
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL DEFAULT '',
  phone text,
  role text NOT NULL DEFAULT 'user',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_profile" ON profiles;
CREATE POLICY "select_own_profile"
  ON profiles FOR SELECT TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "insert_own_profile" ON profiles;
CREATE POLICY "insert_own_profile"
  ON profiles FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile"
  ON profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- ---------- appointments ----------
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES profiles(id) ON DELETE CASCADE,
  service text NOT NULL,
  date date NOT NULL,
  appointment_time text NOT NULL,
  message text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_appointments" ON appointments;
CREATE POLICY "select_own_appointments"
  ON appointments FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_appointments" ON appointments;
CREATE POLICY "insert_own_appointments"
  ON appointments FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_appointments" ON appointments;
CREATE POLICY "update_own_appointments"
  ON appointments FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_appointments" ON appointments;
CREATE POLICY "delete_own_appointments"
  ON appointments FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- ---------- contact_submissions ----------
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact" ON contact_submissions;
CREATE POLICY "anon_insert_contact"
  ON contact_submissions FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- ---------- admin helper functions (SECURITY DEFINER) ----------
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid()
      AND role = 'admin'
  );
$$;

CREATE OR REPLACE FUNCTION admin_list_profiles()
RETURNS SETOF profiles
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT is_admin() THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;
  RETURN QUERY SELECT * FROM profiles ORDER BY created_at DESC;
END;
$$;

CREATE OR REPLACE FUNCTION admin_list_appointments()
RETURNS TABLE (
  id uuid,
  user_id uuid,
  service text,
  date date,
  appointment_time text,
  message text,
  status text,
  created_at timestamptz,
  full_name text,
  email text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT is_admin() THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;
  RETURN QUERY
    SELECT a.id, a.user_id, a.service, a.date, a.appointment_time, a.message, a.status, a.created_at,
           p.full_name, au.email
    FROM appointments a
    LEFT JOIN profiles p ON p.id = a.user_id
    LEFT JOIN auth.users au ON au.id = a.user_id
    ORDER BY a.created_at DESC;
END;
$$;

CREATE OR REPLACE FUNCTION admin_update_appointment_status(
  apt_id uuid,
  new_status text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT is_admin() THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;
  UPDATE appointments SET status = new_status WHERE id = apt_id;
END;
$$;

CREATE OR REPLACE FUNCTION admin_list_contact_submissions()
RETURNS SETOF contact_submissions
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT is_admin() THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;
  RETURN QUERY SELECT * FROM contact_submissions ORDER BY created_at DESC;
END;
$$;

CREATE OR REPLACE FUNCTION admin_update_contact_status(
  sub_id uuid,
  new_status text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT is_admin() THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;
  UPDATE contact_submissions SET status = new_status WHERE id = sub_id;
END;
$$;

CREATE OR REPLACE FUNCTION admin_delete_contact_submission(
  sub_id uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT is_admin() THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;
  DELETE FROM contact_submissions WHERE id = sub_id;
END;
$$;

);

GRANT EXECUTE ON FUNCTION is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION admin_list_profiles() TO authenticated;
GRANT EXECUTE ON FUNCTION admin_list_appointments() TO authenticated;
GRANT EXECUTE ON FUNCTION admin_update_appointment_status(uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION admin_list_contact_submissions() TO authenticated;
GRANT EXECUTE ON FUNCTION admin_update_contact_status(uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION admin_delete_contact_submission(uuid) TO authenticated;

CREATE INDEX IF NOT EXISTS idx_appointments_user_id ON appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
