# Projeto

## Sarter Service Provider

Repo: `C:\Users\Carlos Eduardo\Desktop\bot_eth\01-apps-web\sistema-modulos-veiculares`
Deploy: Vercel
URL desejada: `https://sarter.service.vercel.app`
Vercel: a configurar/confirmar manualmente
Supabase project ref: a configurar/confirmar
Ambiente atual: producao quando variaveis estiverem no Vercel
Banco usa: Supabase via backend com `SUPABASE_SERVICE_ROLE_KEY`

## Regras

- Banco: Supabase
- Nao editar producao direto pelo dashboard
- Toda alteracao de banco deve ir em `supabase/migrations`
- Sempre incluir RLS + policies + grants explicitos
- Nunca expor `SUPABASE_SERVICE_ROLE_KEY` no frontend

## Ambientes Vercel

- preview/staging: usar variaveis de staging e Supabase staging/branch
- production: usar variaveis de producao e Supabase de producao

## Variaveis esperadas

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
