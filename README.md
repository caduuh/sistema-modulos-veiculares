# Sarter Service Provider

Sistema interno web para controle de atendimentos, prestadores, financeiro e logística de módulos veiculares.

URL planejada: `https://sarter.service.vercel.app`

## Rodar localmente

Abra `abrir_sistema_modulos.bat` ou rode:

```bash
npm start
```

Depois acesse:

```text
http://127.0.0.1:8891
```

## Vercel

Publique esta pasta no Vercel. O frontend é estático e a pasta `api/` contém funções serverless iniciais para evoluir a autenticação e integração com banco.

Para testes com amigos e estoque real, use Supabase/Postgres como banco compartilhado. Siga:

- [DEPLOY_VERCEL_SUPABASE.md](docs/DEPLOY_VERCEL_SUPABASE.md)

Arquivos importantes:

- `database/schema.sql`: modelagem do banco.
- `database/seeds.sql`: seeds iniciais.
- `docs/ARQUITETURA.md`: estrutura de pastas e separação frontend/backend.
- `docs/FLUXO_OPERACIONAL.md`: fluxo de uso do sistema.
- `docs/TELAS_PRINCIPAIS.md`: telas criadas.
- `.env.example`: variáveis necessárias no Vercel.

## Administrador padrão

```text
E-mail: admin@sarter.local
Senha: Sarter@123
```

Troque essas credenciais antes de usar em produção.

## Acessos e permissões

Entre com o administrador padrão e abra o menu `Acessos`.

Ao criar um acesso, informe nome, e-mail, senha, perfil e marque quais abas devem aparecer para aquele usuário. O e-mail é normalizado automaticamente, então espaços e letras maiúsculas não impedem o login.
