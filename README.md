# Bioativa — Repositório de Sequências Didáticas Investigativas em Biologia

Projeto acadêmico da **Professora Suzianne Valadares**, desenvolvido para a **defesa de mestrado**.
O objetivo é disponibilizar um **MVP funcional** que demonstre uma plataforma focada em **professores de Biologia do Ensino Médio**, com ênfase em **Sequências Didáticas Investigativas (SDIs)**.

Este repositório contém frontend (Next.js) e backend (FastAPI), além da infraestrutura local com Docker.

---

## Sumário
1. [Visão Geral](#1-visão-geral)
2. [Contexto Acadêmico](#2-contexto-acadêmico)
3. [Escopo e Público-alvo](#3-escopo-e-público-alvo)
4. [Funcionalidades do MVP](#4-funcionalidades-do-mvp)
5. [Arquitetura](#5-arquitetura)
6. [Tecnologias](#6-tecnologias)
7. [Execução Local](#7-execução-local)
8. [Seed de Dados para Demonstração](#8-seed-de-dados-para-demonstração)
9. [Deploy (Produção)](#9-deploy-produção)
10. [Estrutura do Repositório](#10-estrutura-do-repositório)
11. [Fluxos Importantes](#11-fluxos-importantes)
12. [Migrações de Banco](#12-migrações-de-banco)
13. [Observações de Segurança](#13-observações-de-segurança)
14. [Créditos](#14-créditos)

---

## 1) Visão Geral
**Bioativa** é um repositório de SDIs voltado exclusivamente para **professores de Biologia do Ensino Médio**.
O foco está na investigação científica em sala de aula: **problematização, hipótese, coleta de dados e conclusão** — com possibilidade de personalização das etapas.

---

## 2) Contexto Acadêmico
Este projeto integra a **defesa de mestrado da Professora Suzianne Valadares**.
O objetivo é apresentar um **MVP estável**, com funcionalidades suficientes para demonstração pública na banca:
- Login e uso com usuários de teste
- Criação de SDIs com anexos
- Feed pesquisável e filtros
- Comentários e interações

---

## 3) Escopo e Público-alvo
**Público-alvo:** professores de **Biologia** no **Ensino Médio**.
**Fora do escopo:** qualquer referência à Educação Infantil ou outros níveis.

---

## 4) Funcionalidades do MVP
### Conteúdo e Postagens
- Criação de **Sequências Didáticas Investigativas**
- Etapas personalizáveis (título + descrição)
- Anexos (PDF, Word, Excel, imagens, links externos)

### Exploração
- Feed principal com SDIs
- Busca por texto (normalizada, sem acento)
- Filtros por séries (Primeira/Segunda/Terceira)
- Filtros por eixo da Biologia
- Filtros por conexões interdisciplinares

### Interação
- Comentários em cada SDI
- Respostas do autor com selo "Autor"
- Likes e salvos (frontend demo)

---

## 5) Arquitetura
### Frontend
**Framework:** Next.js (App Router)
**Client-side:** React + Tailwind CSS + Radix UI (shadcn/ui)
**Proxy seguro:** chamadas passam por `/api/proxy/...` para anexar token JWT armazenado em cookie HttpOnly.

### Backend
**API:** FastAPI (Python 3.11)
**Banco:** PostgreSQL 15
**Autenticação:** JWT + bcrypt
**Uploads:** endpoint `/api/v1/upload` (armazena em `/uploads/`)

---

## 6) Tecnologias
### Frontend
- Next.js (App Router)
- React 19
- Tailwind CSS
- Radix UI / shadcn/ui
- lucide-react

### Backend
- FastAPI
- SQLAlchemy 2.0
- Pydantic v2
- PostgreSQL 15
- Uvicorn

---

## 7) Execução Local
### Pré-requisitos
- Docker Desktop instalado e rodando

### Subindo ambiente completo
```bash
docker compose up -d --build
```

### Endereços
- Frontend: http://localhost:3000
- Backend (Swagger): http://localhost:8000/docs
- Banco local: `localhost:5433`

---

## 8) Seed de Dados para Demonstração
O projeto inclui um script de seed que popula o banco com professores reais e suas sequências didáticas originais.

### Professores incluídos no seed
| Professor(a) | Instituição | Documento |
|---|---|---|
| **Shirley de Sousa Brito** | UESPI / Teresina-PI | AASA — Desperdício de Alimentos |
| **Roberth Logosvitae** | Rede Estadual do PI | Cartilha Biologia com IA + Apresentação AASA |
| **Samara Costa Oliveira** | Rede Estadual do PI | Planejamento AASA Final |
| **Suzianne Melo Barros** | UESPI / Teresina-PI | Oceano em Apuros |

### Como rodar o seed

```bash
# Instalar dependência (apenas primeira vez)
pip install httpx

# Banco limpo — desenvolvimento local
python3 seed_mvp.py

# Apontando para o backend em produção (Render)
SEED_API_URL=https://sua-api.onrender.com python3 seed_mvp.py
```

**Senha padrão de todos os usuários do seed:** `SuzianneMestrado2026!`

### Hospedagem dos documentos
- Documentos pequenos (`< 5MB`): servidos por `/public/docs/` via Vercel
- Cartilha de Biologia com IA (`86MB`): hospedada no [GitHub Releases v1.0-mvp](https://github.com/Cieliocas/ProfPlatform/releases/tag/v1.0-mvp)

---

## 9) Deploy (Produção)
### Frontend
Hospedado na Vercel (deploy automático via `git push`).

### Backend
Hospedado no Render (deploy automático via `git push`).

> ⚠️ O filesystem do Render é efêmero — arquivos enviados por upload desaparecem ao reiniciar. Para dados persistentes, use o seed de dados acima apontando para o backend em produção.

### Banco (Render Postgres)
Alterações de schema exigem **migração manual**.

---

## 10) Estrutura do Repositório
```
backend/           # API FastAPI
  app/
    routes/        # auth, experiences, upload, uespi_books
    models.py      # Modelos SQLAlchemy
    schemas.py     # Schemas Pydantic
frontend/          # Next.js App
  app/             # App Router (pages + API routes)
  components/      # Componentes React
  public/docs/     # Documentos dos professores (servidos estaticamente)
  src/
    services/      # experienceService, authService, uploadService
    lib/mock-data.ts  # Dados simulados (fallback quando DB vazio)
docker-compose.yml # Infraestrutura local
seed_mvp.py        # Script de seed com dados reais para demonstração
```

---

## 11) Fluxos Importantes
### Autenticação
1. Login no frontend
2. Token JWT armazenado em cookie HttpOnly
3. Proxy do Next.js (`/api/proxy/`) injeta o token nas requisições ao backend

### Modo Apresentação
No arquivo `backend/app/routes/auth.py`, o registro cria usuários com `is_verified=True` — dispensando confirmação de e-mail, facilitando o cadastro ao vivo durante a apresentação.

---

## 12) Migrações de Banco
Quando novos campos são adicionados ao modelo, é necessário alterar o banco em produção:
```sql
ALTER TABLE experiences ADD COLUMN IF NOT EXISTS steps JSON DEFAULT '[]';
```

---

## 13) Observações de Segurança
- Tokens JWT são armazenados em cookies HttpOnly (não acessíveis via JavaScript)
- Uploads são validados por extensão no backend
- O CORS em produção deve ser restringido (`allow_origins=["https://bioativa.vercel.app"]`)

---

## 14) Créditos

### Orientação Acadêmica e Idealizadora
**Profa. Suzianne Valadares**
Mestranda em Ensino de Ciências e Biologia | Universidade Estadual do Piauí — UESPI
Pesquisadora em metodologias investigativas para o Ensino Médio de Biologia

### Professores colaboradores com sequências didáticas originais
- **Shirley de Sousa Brito** — UESPI / Teresina-PI
- **Roberth** — Rede Estadual de Ensino do Piauí
- **Samara Costa Oliveira** — Rede Estadual de Ensino do Piauí

### Desenvolvimento técnico
Franciélio Castro — Desenvolvedor Full Stack
[github.com/Cieliocas](https://github.com/Cieliocas)
