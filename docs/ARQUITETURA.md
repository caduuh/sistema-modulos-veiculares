# Sarter Service Provider - Arquitetura

## Estrutura de pastas

```text
sistema-modulos-veiculares/
  api/                  Backend serverless para Vercel
    auth/login.js
    bootstrap.js
  database/             Modelagem SQL e seeds iniciais
    schema.sql
    seeds.sql
  docs/                 Documentação operacional e técnica
  src/
    backend/data/       Seeds e constantes do servidor
    shared/             Regras de negócio reutilizáveis
  index.html            Frontend atual
  app.js                Componentes e renderização do painel
  styles.css            UI responsiva, cards, tabelas e gráficos
  server.js             Servidor local para testes
  vercel.json           Cabeçalhos de segurança
```

## Separação frontend/backend

O frontend atual é estático e pronto para Vercel. Ele usa `localStorage` para testes rápidos entre amigos. A pasta `api/` já separa a camada backend em funções serverless, permitindo trocar a persistência local por Postgres/Supabase/Neon depois.

## Componentização

No `app.js`, as telas são renderizadas por funções específicas: dashboard, clientes, prestadores, serviços, financeiro, POC, calendário e estoque. As regras financeiras ficam isoladas em `src/shared/finance.js` para serem reutilizadas no backend.

## Segurança

- Cabeçalhos de segurança configurados em `vercel.json`.
- Login serverless inicial em `api/auth/login.js` com comparação em tempo constante.
- Senha padrão apenas para ambiente inicial: `admin@sarter.local` / `Sarter@123`.
- Em produção, trocar senha padrão, usar hash forte e configurar variáveis de ambiente.
