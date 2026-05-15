CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'ADMIN',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  responsible_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  cnpj TEXT NOT NULL UNIQUE,
  address TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('POC', 'Cliente ativo', 'Contrato fechado')),
  fleet_size INTEGER NOT NULL DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  region TEXT NOT NULL,
  state CHAR(2) NOT NULL,
  city TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Equipe própria', 'Terceirizado')),
  availability TEXT NOT NULL,
  contact TEXT NOT NULL,
  agenda TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id),
  provider_id UUID NOT NULL REFERENCES providers(id),
  service_type TEXT NOT NULL CHECK (service_type IN ('Instalação', 'Manutenção', 'Retirada')),
  region_state TEXT NOT NULL,
  scheduled_date DATE NOT NULL,
  service_time TIME,
  vehicle_plate TEXT,
  vehicle_model TEXT,
  installation_type TEXT NOT NULL,
  km NUMERIC(12,2) NOT NULL DEFAULT 0,
  km_value NUMERIC(12,2) NOT NULL DEFAULT 0,
  toll NUMERIC(12,2) NOT NULL DEFAULT 0,
  install_value NUMERIC(12,2) NOT NULL DEFAULT 0,
  provider_paid NUMERIC(12,2) NOT NULL DEFAULT 0,
  notes TEXT,
  status TEXT NOT NULL CHECK (status IN ('Agendado', 'Em andamento', 'Finalizado', 'Cancelado')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE finance_expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('Despesa fixa', 'Despesa variável')),
  category TEXT NOT NULL,
  amount NUMERIC(12,2) NOT NULL CHECK (amount >= 0),
  due_date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Pendente', 'Pago')) DEFAULT 'Pendente',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE access_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL,
  permissions TEXT[] NOT NULL DEFAULT '{}',
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE poc_controls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  installed_modules INTEGER NOT NULL DEFAULT 0,
  converted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE poc_visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  poc_id UUID NOT NULL REFERENCES poc_controls(id),
  visit_date DATE NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE stock_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  movement_date DATE NOT NULL DEFAULT CURRENT_DATE,
  region TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Entrada', 'Saída', 'Entregue', 'Retirado na matriz')),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  responsible TEXT NOT NULL,
  notes TEXT
);

CREATE INDEX idx_services_scheduled_date ON services(scheduled_date);
CREATE INDEX idx_services_client_id ON services(client_id);
CREATE INDEX idx_services_provider_id ON services(provider_id);
CREATE INDEX idx_stock_region ON stock_movements(region);
CREATE INDEX idx_finance_expenses_due_date ON finance_expenses(due_date);
CREATE INDEX idx_access_users_email ON access_users(email);
