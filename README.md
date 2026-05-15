# Sarter Service Provider

Sistema interno web para controle de clientes, prestadores, agendamentos, financeiro, acessos e estoque de módulos veiculares.

URL atual: `https://sistema-modulos-veiculares.vercel.app`

Nome exibido no sistema: `Sarter Service Provider`

## Rodar localmente

```bash
npm install
npm start
```

Depois acesse:

```text
http://127.0.0.1:8891
```

## Administrador padrão

```text
Perfil: Admin
E-mail: admin@sarter.local
Senha: Sarter@123
```

Troque essas credenciais antes de usar em produção.

## Deploy e banco

O frontend fica estático no Vercel e as rotas em `api/` gravam no Supabase quando as variáveis de ambiente estão configuradas.

Para configurar ou atualizar produção, siga o passo a passo em:

- [docs/DEPLOY_VERCEL_SUPABASE.md](docs/DEPLOY_VERCEL_SUPABASE.md)

Arquivos importantes:

- `database/schema.sql`: estrutura completa para banco novo.
- `database/migrations/20260515_service_provider_updates.sql`: atualização para banco existente.
- `database/seeds.sql`: dados iniciais.
- `.env.example`: variáveis necessárias no Vercel.
