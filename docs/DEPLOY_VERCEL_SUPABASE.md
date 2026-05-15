# Deploy do Sarter Service Provider

URL desejada: `https://sarter.service.vercel.app`

## 1. Supabase

Para banco novo:

1. Abra o Supabase.
2. Entre no projeto do sistema.
3. Vá em `SQL Editor`.
4. Rode o conteúdo de `database/schema.sql`.
5. Rode o conteúdo de `database/seeds.sql`.

Para banco que já estava em uso:

1. Abra `SQL Editor`.
2. Rode `database/migrations/20260513_operational_updates.sql`, se ainda não rodou.
3. Rode `database/migrations/20260515_service_provider_updates.sql`.
4. Rode `database/migrations/20260513_security_hardening.sql`, se ainda não rodou.

A migração de `20260515` cria os campos novos de agendamento: horário, placa, modelo, tipo `Retirada`, e a tabela `finance_expenses` para despesas fixas e variáveis.

## 2. Variáveis no Vercel

No projeto `sistema-modulos-veiculares` da Vercel, abra `Settings > Environment Variables` e cadastre:

```text
SUPABASE_URL=URL do projeto Supabase
SUPABASE_SERVICE_ROLE_KEY=service_role key do Supabase
SESSION_SECRET=uma frase/senha longa para assinar sessoes
ADMIN_EMAIL=admin@sarter.local
ADMIN_INITIAL_PASSWORD=Sarter@123
```

Use a chave `service_role` somente no Vercel. Não coloque essa chave no frontend.

Depois de salvar variáveis, faça um novo deploy.

## 3. Vercel

O projeto correto no Vercel é `sistema-modulos-veiculares`.

Fluxo seguro:

```bash
npm run check
npm run build
npx vercel --scope map-tech-s-projects
```

Quando a versão estiver validada:

```bash
npx vercel deploy --prod --scope map-tech-s-projects
```

## 4. Domínio

Para usar `sarter.service.vercel.app`:

1. Abra o projeto `sistema-modulos-veiculares` no Vercel.
2. Vá em `Settings > Domains`.
3. Adicione `sarter.service.vercel.app`.
4. Siga a validação indicada pela Vercel.
5. Faça um novo deploy depois que o domínio estiver válido.

## 5. Acessos

Na aba `Acessos`, o administrador define:

- perfil do usuário;
- empresas permitidas;
- abas que aparecerão no menu;
- se o acesso fica ativo ou inativo.

O e-mail é normalizado para minúsculas antes de salvar e antes do login. Para usuários que não são Admin, selecione pelo menos uma empresa e uma aba.
