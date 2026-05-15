# Seguranca para testes com clientes

## Variaveis no Vercel

Configure somente no Vercel, nunca no frontend:

```env
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
SESSION_SECRET=uma-chave-grande-e-aleatoria
APP_ENV=production
```

## Banco

Rode as migrations:

- `database/migrations/20260513_operational_updates.sql`
- `database/migrations/20260513_security_hardening.sql`

A migration de seguranca ativa RLS e revoga acesso direto de `anon` e `authenticated`. O app usa apenas o backend com `service_role`, e o backend filtra por sessao, perfil, abas e empresas permitidas.

## Backup

Antes de testes reais:

```bash
npm run backup:supabase
```

O arquivo vai para `backups/` e nao entra no Git.

## Ambientes

Use dois projetos Supabase:

- `instalacoes-sarter-test`: dados de teste e clientes piloto.
- `instalacoes-sarter-prod`: dados reais quando o fluxo estiver validado.

No Vercel, use variaveis diferentes para Preview e Production.
