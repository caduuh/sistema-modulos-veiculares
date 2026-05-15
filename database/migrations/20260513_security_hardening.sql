-- Bloqueia acesso direto anon/authenticated às tabelas do app.
-- O backend usa service_role guardada no Vercel e aplica permissões por sessão.
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE poc_controls ENABLE ROW LEVEL SECURITY;
ALTER TABLE poc_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_accesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_access_clients ENABLE ROW LEVEL SECURITY;

ALTER TABLE clients FORCE ROW LEVEL SECURITY;
ALTER TABLE providers FORCE ROW LEVEL SECURITY;
ALTER TABLE services FORCE ROW LEVEL SECURITY;
ALTER TABLE poc_controls FORCE ROW LEVEL SECURITY;
ALTER TABLE poc_visits FORCE ROW LEVEL SECURITY;
ALTER TABLE stock_movements FORCE ROW LEVEL SECURITY;
ALTER TABLE app_accesses FORCE ROW LEVEL SECURITY;
ALTER TABLE app_access_clients FORCE ROW LEVEL SECURITY;

REVOKE ALL ON clients FROM anon, authenticated;
REVOKE ALL ON providers FROM anon, authenticated;
REVOKE ALL ON services FROM anon, authenticated;
REVOKE ALL ON poc_controls FROM anon, authenticated;
REVOKE ALL ON poc_visits FROM anon, authenticated;
REVOKE ALL ON stock_movements FROM anon, authenticated;
REVOKE ALL ON app_accesses FROM anon, authenticated;
REVOKE ALL ON app_access_clients FROM anon, authenticated;
