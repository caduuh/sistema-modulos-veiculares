-- Usuário administrador padrão para o primeiro ambiente.
-- Troque a senha no primeiro acesso e armazene somente hash em produção.
INSERT INTO admins (email, password_hash, role)
VALUES ('admin@sarter.local', 'CHANGE_ME_HASH_Sarter@123', 'ADMIN');

INSERT INTO clients (company_name, responsible_name, phone, email, cnpj, address, status, fleet_size, installed_modules, company_type, notes)
VALUES
('Facss', 'Marina Rocha', '(31) 98810-4420', 'marina@facss.com.br', '12.345.678/0001-90', 'Contagem, MG', 'Contrato fechado', 86, 40, 'Facss', 'Atendimento exclusivo.'),
('Frota Minas Alimentos', 'Rafael Dias', '(31) 99722-8810', 'rafael@frotaminas.com.br', '31.554.010/0001-12', 'Betim, MG', 'Cliente ativo', 42, 18, 'Padrao', 'Manutenção preventiva prioritária.'),
('Expresso Centro-Oeste', 'Camila Torres', '(62) 99180-1100', 'camila@ecoeste.com.br', '08.117.222/0001-40', 'Goiânia, GO', 'POC', 24, 8, 'Padrao', 'POC com módulos plug and play.');

INSERT INTO providers (name, region, state, city, type, availability, install_value, maintenance_value, contact, agenda)
VALUES
('Equipe BH Norte', 'Belo Horizonte', 'MG', 'Belo Horizonte', 'Equipe própria', 'Disponível', 180, 120, '(31) 99910-2010', 'Seg-Sex 08:00-18:00'),
('TecCar Contagem', 'Metropolitana BH', 'MG', 'Contagem', 'Terceirizado', 'Disponível', 220, 145, '(31) 98831-9022', 'Seg-Sáb 07:30-17:00'),
('Equipe Centro-Oeste', 'Centro-Oeste', 'GO', 'Goiânia', 'Equipe própria', 'Em deslocamento', 190, 135, '(62) 99120-4210', 'Seg-Sex 09:00-18:00');
