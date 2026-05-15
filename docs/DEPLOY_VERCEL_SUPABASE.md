# Deploy do Sarter Service Provider no Vercel com Supabase

URL desejada: `https://sarter.service.vercel.app`

## 1. Criar o banco

1. Acesse o Supabase e crie um projeto.
2. Abra `SQL Editor`.
3. Se o banco for novo, execute o conteúdo de `database/schema.sql`.
4. Se o banco já existir com a versão antiga, execute `database/upgrade_sarter_service_provider.sql`.
5. Em banco novo, execute também o conteúdo de `database/seeds.sql`.

## 2. Pegar as chaves

No Supabase, abra `Project Settings > API` e copie:

- `Project URL`
- `service_role key`

Use a `service_role key` somente no backend/Vercel. Nunca coloque essa chave no `app.js` ou em código visível no navegador.

## 3. Configurar variáveis no Vercel

No projeto do Vercel:

1. Abra `Settings`.
2. Entre em `Environment Variables`.
3. Cadastre:

```text
SUPABASE_URL=Project URL do Supabase
SUPABASE_SERVICE_ROLE_KEY=service_role key do Supabase
ADMIN_EMAIL=admin@sarter.local
ADMIN_INITIAL_PASSWORD=Sarter@123
```

Depois clique em `Redeploy`.

Para o problema de login por e-mail: mantenha `ADMIN_EMAIL` sem espaços e em minúsculas. O sistema também normaliza o e-mail digitado, então ` ADMIN@SARTER.LOCAL ` passa a validar como `admin@sarter.local`.

## 4. Publicar

Você pode publicar pelo GitHub:

1. Suba a pasta `sistema-modulos-veiculares` para um repositório.
2. No Vercel, clique em `Add New > Project`.
3. Importe o repositório.
4. Confirme que o diretório raiz é `sistema-modulos-veiculares`, se o repositório tiver outras pastas.
5. Clique em `Deploy`.

Para usar o domínio `sarter.service.vercel.app`, abra o projeto na Vercel, vá em `Settings > Domains`, adicione `sarter.service.vercel.app` e siga a validação de DNS indicada pela Vercel. Depois que o domínio estiver válido, faça um novo deploy.

## 5. Como os testes com amigos funcionam

Quando as variáveis `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` estiverem configuradas no Vercel, o frontend carrega os dados de `/api/bootstrap` e grava clientes, prestadores, agendamentos e estoque pelas rotas `api/`.

No PC, se o Supabase não estiver configurado, o sistema continua funcionando com dados locais no navegador.

## Passo a passo curto para atualizar produção

1. No Supabase, rode `database/upgrade_sarter_service_provider.sql`.
2. No Vercel, confira as variáveis `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_EMAIL` e `ADMIN_INITIAL_PASSWORD`.
3. Suba os arquivos no GitHub conectado ao projeto.
4. No Vercel, faça `Redeploy`.
5. Abra o sistema, entre com o admin e crie os acessos no menu `Acessos`, marcando as abas permitidas para cada e-mail.
