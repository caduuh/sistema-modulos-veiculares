-- Upgrade para Sarter Service Provider em um Supabase que ja tenha o schema antigo.
-- Rode no SQL Editor antes do redeploy na Vercel.

ALTER TABLE services
  ADD COLUMN IF NOT EXISTS service_time TIME,
  ADD COLUMN IF NOT EXISTS vehicle_plate TEXT,
  ADD COLUMN IF NOT EXISTS vehicle_model TEXT;

ALTER TABLE services
  DROP CONSTRAINT IF EXISTS services_service_type_check;

ALTER TABLE services
  ADD CONSTRAINT services_service_type_check
  CHECK (service_type IN ('Instalação', 'Manutenção', 'Retirada'));

CREATE TABLE IF NOT EXISTS finance_expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('Despesa fixa', 'Despesa variável')),
  category TEXT NOT NULL,
  amount NUMERIC(12,2) NOT NULL CHECK (amount >= 0),
  due_date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Pendente', 'Pago')) DEFAULT 'Pendente',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS access_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL,
  permissions TEXT[] NOT NULL DEFAULT '{}',
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_finance_expenses_due_date ON finance_expenses(due_date);
CREATE INDEX IF NOT EXISTS idx_access_users_email ON access_users(email);
