ALTER TABLE services ADD COLUMN IF NOT EXISTS service_time TIME;
ALTER TABLE services ADD COLUMN IF NOT EXISTS vehicle_plate TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS vehicle_model TEXT;

ALTER TABLE services DROP CONSTRAINT IF EXISTS services_service_type_check;
ALTER TABLE services
  ADD CONSTRAINT services_service_type_check
  CHECK (service_type IN ('Instalação', 'Manutenção', 'Retirada'));

CREATE TABLE IF NOT EXISTS finance_expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('Despesa fixa', 'Despesa variável')),
  category TEXT NOT NULL,
  amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  due_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pendente' CHECK (status IN ('Pendente', 'Pago', 'Atrasado')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_finance_expenses_due_date ON finance_expenses(due_date);

ALTER TABLE finance_expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE finance_expenses FORCE ROW LEVEL SECURITY;
REVOKE ALL ON finance_expenses FROM anon, authenticated;
