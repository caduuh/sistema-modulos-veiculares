# Projeto

## Sarter Service Provider

Repo: `https://github.com/caduuh/sistema-modulos-veiculares.git`
Deploy atual: `https://sistema-modulos-veiculares.vercel.app`
URL exibida no app: `sarter.service.vercel.app`
Observação: a Vercel recusou o alias `sarter.service.vercel.app` nesta conta porque `*.service.vercel.app` está reservado para outro escopo.
Vercel project: `sistema-modulos-veiculares`
Vercel scope: `map-tech-s-projects`

## Regras

- Não editar nem publicar pelo projeto antigo `project-77km5`.
- Banco: Supabase via backend serverless.
- Toda alteração de banco deve ficar em `database/migrations`.
- Nunca expor `SUPABASE_SERVICE_ROLE_KEY` no frontend.

## Variáveis esperadas no Vercel

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SESSION_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_INITIAL_PASSWORD`
