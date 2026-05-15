ALTER TABLE clients ADD COLUMN IF NOT EXISTS installed_modules INTEGER NOT NULL DEFAULT 0;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS company_type TEXT NOT NULL DEFAULT 'Padrao';
ALTER TABLE clients ADD COLUMN IF NOT EXISTS exclusive BOOLEAN NOT NULL DEFAULT false;

CREATE TABLE IF NOT EXISTS app_accesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'manager', 'technician')),
  allowed_views JSONB NOT NULL DEFAULT '[]'::jsonb,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE app_accesses ADD COLUMN IF NOT EXISTS allowed_views JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE app_accesses DROP CONSTRAINT IF EXISTS app_accesses_role_check;
UPDATE app_accesses SET role = 'manager' WHERE role = 'company';
UPDATE app_accesses SET role = 'technician' WHERE role = 'analyst';
ALTER TABLE app_accesses ADD CONSTRAINT app_accesses_role_check CHECK (role IN ('admin', 'manager', 'technician'));

ALTER TABLE app_accesses DROP CONSTRAINT IF EXISTS app_accesses_email_format_check;
ALTER TABLE app_accesses ADD CONSTRAINT app_accesses_email_format_check CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$');

CREATE TABLE IF NOT EXISTS app_access_clients (
  access_id UUID NOT NULL REFERENCES app_accesses(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  PRIMARY KEY (access_id, client_id)
);

ALTER TABLE services ADD COLUMN IF NOT EXISTS gasoline NUMERIC(12,2) NOT NULL DEFAULT 0;
ALTER TABLE services ADD COLUMN IF NOT EXISTS car_maintenance NUMERIC(12,2) NOT NULL DEFAULT 0;
ALTER TABLE services ADD COLUMN IF NOT EXISTS fixed_salary NUMERIC(12,2) NOT NULL DEFAULT 0;
ALTER TABLE services ADD COLUMN IF NOT EXISTS expenses NUMERIC(12,2) NOT NULL DEFAULT 0;

ALTER TABLE stock_movements ADD COLUMN IF NOT EXISTS client_id UUID REFERENCES clients(id);
