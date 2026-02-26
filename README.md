# Vivência (ProfPlatform) 📚

Bem-vindo ao repositório do projeto **Vivência (ProfPlatform)**, um espaço acolhedor e colaborativo onde professores trocam vivências pedagógicas, descobrem práticas inovadoras e constroem juntos uma educação mais criativa e significativa.

---

## 🛠 Bibliotecas e Tecnologias

O projeto foi modernizado recentemente adotando o que há de mais recente no ecossistema de desenvolvimento web.

### Frontend
- **Framework Opcional**: [Next.js 16](https://nextjs.org/) (App Router, Proxys, Server/Route Handlers).
- **Core Visual**: [React 19](https://react.dev/), Vite (p/ React Componentes).
- **Estilização**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Componentes Base**: [Radix UI](https://www.radix-ui.com/) & Shadcn UI para acessibilidade e design unificado.
- **Formulários e Validação**: `react-hook-form` + `zod` para schema-validation.
- **Ícones**: `lucide-react`.
- **Comunicação Segura B2B**: `axios` para consumo de APIs, gerenciamento de tokens via Next.js Proxy + HttpOnly cookies.

### Backend
- **Framework API**: [FastAPI](https://fastapi.tiangolo.com/) (Python 3.11). Altamente performático graças ao Starlette e Pydantic.
- **Servidor Web**: Uvicorn.
- **Banco de Dados**: PostgreSQL 15.
- **ORM**: [SQLAlchemy 2.0](https://www.sqlalchemy.org/).
- **Modelagem & Data Validação**: Pydantic v2 (com dependência de `email-validator`).
- **Autenticação**: JWT (`python-jose`) e hashing de senhas com `passlib (bcrypt)`.

---

## 🐳 Infraestrutura e Docker

Para garantir reprodutibilidade, fácil setup e padronização, a infraestrutura local inteira gira em torno do **Docker e Docker Compose**. O repositório contém 3 serviços orquestrados principais:

### 1. `db` (PostgreSQL)
- **Imagem**: `postgres:15-alpine`
- **Volume persistido**: Os dados não se perdem ao reiniciar os containers, mantidos através da definição do volume `postgres_data`.
- **Healthcheck**: Existe um veridicador passivo (`pg_isready`) para garantir que o banco está rodando antes que o backend inicie.
- **Host Port**: Exposto localmente em `5433` (para evitar conflitos com Postgres nativos rodando na porta `5432`) mapeando para a `5432` interna.

### 2. `backend` (FastAPI)
- Baseado em imagem multi-stage `python:3.11-slim`.
- Instalados drivers C nativos (`gcc`, `libpq-dev`) exigidos pelo backend robusto do SQLAlchemy + PostgreSQL.
- Depende diretamente do Healthcheck do banco (`db_healthy`).
- Rodando via Uvicorn na porta interna/externa `8000`.

### 3. `frontend` (Next.js)
- Roda no node em ambiente de desenvolvimento (`next dev`).
- Monta o diretório de arquivos estáticos local, além da porta `3000`.
- Depende do backend já estar funcional. Configurado para ouvir enquetes da API Next URL.

A topologia Docker isola cada elemento com excelência, onde os aplicativos "conversam" através do DNS interno das Docker Networks.

---

## 🔐 Arquitetura de Autenticação

Para contornar falhas de segurança conhecidas num modelo clássico de arquitetura SPA (Single Page Application) e mitigar 100% ataques Cross-Site Scripting (XSS), implementamos o padrão de **Frontend Proxy + HttpOnly Cookies**:

1. O cliente React invoca o `authService` para fazer **Login**.
2. A requisição vai para `/api/auth/login` (Route Handler do **Next.js Server**).
3. O Servidor Next.js fará o Request Real (Server-to-Server) para a API no **FastAPI**.
4. O Backend FastAPI retorna o `access_token` JWT.
5. O Next.js armazena esse token em um cookie setado como `HttpOnly`, `Secure` e `SameSite=lax`. *Isso significa que o Javascript do Front não consegue mais ler ou manipular o token (à prova de XSS)*.
6. Qualquer requisição futura a partir do Frontend direcionada para dados autenticados é interceptada e enviada via `axios` para o `proxy` Route Handler em `/api/proxy/[...path]`.
7. O `Proxy` tira o token da sessão HttpOnly, anexa o cabeçalho `Authorization: Bearer <token>` de forma segura e bate no Backend, retornando o dado esperado ao Frontend invisivelmente.

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- [Docker](https://docs.docker.com/get-docker/) instalado e o *daemon* rodando.

### Instalação (Método Docker)

1. **Clone este repositório** e acesse a pasta raiz:
   ```bash
   git clone https://github.com/Cieliocas/ProfPlatform.git
   cd ProfPlatform
   ```

2. **Inicie os Containers**:
   ```bash
   docker compose up -d --build
   ```

3. **Valide seu ambiente**:
   - **Frontend**: Acesse [http://localhost:3000](http://localhost:3000)
   - **Backend API Docs**: Acesse SwaggerUI em [http://localhost:8000/docs](http://localhost:8000/docs)
   - **Database (Via PgAdmin ou psql)**: Host `localhost`, DB `profplatform`, User `user`, Senha `password`, Porta `5433`

> Tudo subirá automaticamente. O FastAPI cuidará de gerar as tabelas novas no Postgres via ORM na sua primeira rodada e o Next.js mapeará suas rotas.

---

## 🌟 Recursos Atuais Disponíveis

- Registro de Novos Usuários
- Login Protegido (JWT, BCrypt e Cookies HttpOnly)
- Logout / Validação de Sessão Server-side
- Arquitetura de Tabela em Banco PostgreSQL
- Interface Interativa Padrão com Componentes acessíveis do Shadcn (Radix)
