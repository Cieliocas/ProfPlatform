#!/usr/bin/env python3
"""
seed_mvp.py — Seed de dados reais para o ProfPlatform MVP
==========================================================
Cria usuários-professores reais e publica suas Sequências Didáticas
com os documentos originais anexados via URLs permanentes.

Estratégia de hospedagem dos documentos:
  - Docs pequenos (<5MB): servidos via Vercel (frontend/public/docs/)
  - Cartilha grande (86MB): hospedada no GitHub Releases v1.0-mvp

Uso:
    python3 seed_mvp.py [URL_BASE]

    URL_BASE padrão: http://localhost:3000 (desenvolvimento local)

    Em produção (após deploy Vercel):
    python3 seed_mvp.py https://bioativa.vercel.app

Pré-requisitos:
    pip install httpx
    Backend rodando (docker compose up -d OU Render)
"""

import os
import sys
import httpx

# ---------------------------------------------------------------------------
# Configuração
# ---------------------------------------------------------------------------

# A URL do BACKEND (Render ou localhost:8000)
BACKEND_URL = os.getenv("SEED_API_URL", "http://localhost:8000")

# Senha padrão para todos os usuários de demonstração
DEFAULT_PASSWORD = "SuzianneMestrado2026!"

# ---------------------------------------------------------------------------
# URLs dos documentos
# ---------------------------------------------------------------------------
# Docs pequenos: URLs relativas /docs/ — funcionam em qualquer ambiente
# (Vercel serve frontend/public/docs/; localhost serve via Next.js static)
DOC_SHIRLEY     = "/docs/AASA_Shirley_de_Sousa_Brito.docx"
DOC_ROBERTH_BSA = "/docs/BSA_Apresentacao_AASA_Prof_Roberth.pdf"
DOC_SAMARA      = "/docs/Planejamento_AASA_Samara.pdf"
DOC_OCEANO      = "/docs/Oceano_em_Apuros.pdf"

# Cartilha grande (86MB) — hospedada no GitHub Releases v1.0-mvp (URL absoluta)
DOC_CARTILHA = "https://github.com/Cieliocas/ProfPlatform/releases/download/v1.0-mvp/Cartilha_Aulas_Praticas_Biologia_IA.pdf"

# ---------------------------------------------------------------------------
# Dados dos professores e suas publicações
# ---------------------------------------------------------------------------

PROFESSORS = [
    {
        "name": "Shirley de Sousa Brito",
        "email": "shirley.brito@uespi.edu.br",
        "bio": "Professora de Biologia com foco em educação alimentar e sustentabilidade. UESPI / Campus Poeta Torquato Neto, Teresina-PI.",
        "location_city": "Teresina",
        "location_state": "PI",
        "workplace": "Universidade Estadual do Piauí - UESPI",
        "graduation_level": "Mestre",
        "posts": [
            {
                "title": "Como podemos reduzir o desperdício de alimentos no ambiente escolar?",
                "content": (
                    "Esta AASA (Atividade de Aprendizagem Sequencial e Articulada) investiga a problemática do "
                    "desperdício alimentar no contexto escolar, conectando Biologia, Química e Educação Ambiental. "
                    "Os estudantes levantam dados locais sobre descarte de alimentos, formulam hipóteses sobre causas "
                    "e propõem intervenções concretas. A sequência foi desenvolvida com base nos princípios da "
                    "aprendizagem investigativa e nos marcos da BNCC para o Ensino Médio."
                ),
                "classification": "Sequência didática investigativa",
                "discipline": "Biologia",
                "tags": ["Ecologia", "Terceira série", "Interdisciplinar", "Quimica", "Sustentabilidade"],
                "steps": [
                    {"title": "Problematização", "description": "Apresentação de dados globais e locais sobre desperdício alimentar (FAO, IBGE)."},
                    {"title": "Formulação de Hipóteses", "description": "Os alunos identificam as causas do desperdício na escola por meio de fichas guiadas."},
                    {"title": "Coleta de Dados", "description": "Monitoramento do lixo orgânico do restaurante escolar por 5 dias."},
                    {"title": "Análise e Discussão", "description": "Comparação de dados coletados com a literatura e construção de gráficos."},
                    {"title": "Proposta de Intervenção", "description": "Elaboração de campanha de conscientização e relatório final."},
                ],
                "attachment": {
                    "file_name": "AASA Shirley de Sousa Brito",
                    "file_type": "docx",
                    "file_url": DOC_SHIRLEY,
                },
            }
        ],
    },
    {
        "name": "Prof. Roberth",
        "email": "roberth@escola.pi.gov.br",
        "bio": "Professor de Biologia e produtor de materiais didáticos digitais com integração de IA. Ensino Médio — Piauí.",
        "location_city": "Teresina",
        "location_state": "PI",
        "workplace": "Rede Estadual de Ensino do Piauí",
        "graduation_level": "Especialista",
        "posts": [
            {
                "title": "Como integrar Biologia e Inteligência Artificial em aulas práticas investigativas?",
                "content": (
                    "Cartilha didática desenvolvida para orientar professores de Biologia na integração de "
                    "ferramentas de Inteligência Artificial em atividades práticas e investigativas. "
                    "Apresenta propostas de aulas que conectam o método científico à análise de dados com IA, "
                    "viabilizando investigações em Ecologia, Genética e Fisiologia com recursos acessíveis."
                ),
                "classification": "Sequência didática investigativa",
                "discipline": "Biologia",
                "tags": ["Ecologia", "Primeira série", "Interdisciplinar", "Matematica", "Metodo Cientifico"],
                "steps": [
                    {"title": "Apresentação da IA", "description": "Introdução prática a ferramentas de IA acessíveis (ChatGPT, Teachable Machine)."},
                    {"title": "Problema Biológico", "description": "Seleção de uma questão local para investigar com suporte de dados digitais."},
                    {"title": "Coleta e Análise", "description": "Uso de IA para organizar e interpretar dados coletados pelos alunos."},
                    {"title": "Síntese", "description": "Produção de relatório multimídia integrando evidências e conclusões."},
                ],
                "attachment": {
                    "file_name": "Cartilha Aulas Práticas Biologia com IA",
                    "file_type": "pdf",
                    "file_url": DOC_CARTILHA,
                },
            },
            {
                "title": "Quais evidências científicas os alunos conseguem construir sobre biodiversidade local?",
                "content": (
                    "Apresentação da AASA desenvolvida com a Turma 06 em 2024, demonstrando como estudantes do "
                    "Ensino Médio construíram evidências científicas sobre biodiversidade e impactos ambientais "
                    "no entorno da escola. A sequência utilizou o método investigativo desde a problematização "
                    "até a socialização dos resultados em formato de seminário científico."
                ),
                "classification": "Sequência didática investigativa",
                "discipline": "Biologia",
                "tags": ["Ecologia", "Segunda série", "Interdisciplinar", "Geografia", "Bioindicadores"],
                "steps": [
                    {"title": "Questão Norteadora", "description": "Mapeamento da biodiversidade nos arredores da escola."},
                    {"title": "Planejamento", "description": "Definição de critérios e instrumentos de coleta."},
                    {"title": "Investigação de Campo", "description": "Saída de campo com registro fotográfico e ficha de observação."},
                    {"title": "Análise", "description": "Sistematização dos dados e comparação com referências."},
                    {"title": "Seminário", "description": "Apresentação dos resultados para a comunidade escolar."},
                ],
                "attachment": {
                    "file_name": "BSA Apresentação AASA Prof Roberth Turma 06",
                    "file_type": "pdf",
                    "file_url": DOC_ROBERTH_BSA,
                },
            },
        ],
    },
    {
        "name": "Samara Costa Oliveira",
        "email": "samara.oliveira@escola.pi.gov.br",
        "bio": "Professora de Ciências e Biologia no Ensino Médio. Especialista em sequências didáticas investigativas.",
        "location_city": "Teresina",
        "location_state": "PI",
        "workplace": "Rede Estadual de Ensino do Piauí",
        "graduation_level": "Especialista",
        "posts": [
            {
                "title": "Como planejar uma Atividade de Aprendizagem baseada em investigação científica?",
                "content": (
                    "Planejamento completo de AASA (Atividade de Aprendizagem Sequencial e Articulada) estruturado "
                    "para o Ensino Médio. A sequência aborda os fundamentos do método investigativo aplicado à "
                    "Biologia, com etapas detalhadas de diagnóstico, execução e avaliação. Inclui orientações para "
                    "adaptação ao contexto de cada turma e métricas de acompanhamento do aprendizado."
                ),
                "classification": "Sequência didática investigativa",
                "discipline": "Biologia",
                "tags": ["Citologia", "Primeira série", "Interdisciplinar", "Matematica", "Metodo Cientifico"],
                "steps": [
                    {"title": "Diagnóstico", "description": "Levantamento dos conhecimentos prévios dos estudantes."},
                    {"title": "Problematização", "description": "Apresentação da questão investigativa central da sequência."},
                    {"title": "Investigação", "description": "Realização de atividades práticas e coleta de evidências."},
                    {"title": "Sistematização", "description": "Construção coletiva de conceitos a partir das evidências."},
                    {"title": "Avaliação", "description": "Registro e autoavaliação do percurso investigativo."},
                ],
                "attachment": {
                    "file_name": "Planejamento AASA Samara Final",
                    "file_type": "pdf",
                    "file_url": DOC_SAMARA,
                },
            }
        ],
    },
    {
        "name": "Samara Oliveira da Silva",
        "email": "samara.silva@escola.pi.gov.br",
        "bio": "Professora de Ciências e Biologia no Ensino Médio. Desenvolve sequências didáticas investigativas com foco em ecossistemas marinhos e educação ambiental.",
        "location_city": "Teresina",
        "location_state": "PI",
        "workplace": "Rede Estadual de Ensino do Piauí",
        "graduation_level": "Especialista",
        "posts": [
            {
                "title": "O que acontece com os ecossistemas marinhos diante da poluição por plásticos?",
                "content": (
                    "Sequência didática investigativa que integra Biologia, Química e Geografia para compreender "
                    "os impactos da poluição plástica nos ecossistemas marinhos. Os estudantes investigam a "
                    "problemática dos oceanos em apuros por meio de dados científicos reais, experimentos "
                    "simulados e produção de material de conscientização para a escola."
                ),
                "classification": "Sequência didática investigativa",
                "discipline": "Biologia",
                "tags": ["Ecologia", "Segunda série", "Interdisciplinar", "Quimica", "Sustentabilidade"],
                "steps": [
                    {"title": "Problematização", "description": "Exibição de dados sobre poluição oceânica e discussão inicial."},
                    {"title": "Hipóteses", "description": "Levantamento de hipóteses sobre causas e consequências."},
                    {"title": "Pesquisa Documental", "description": "Análise de reportagens, dados do IBGE e literatura científica."},
                    {"title": "Experimento Simulado", "description": "Simulação do impacto de microplásticos em cadeia alimentar."},
                    {"title": "Divulgação Científica", "description": "Produção de cartaz ou vídeo de conscientização."},
                ],
                "attachment": {
                    "file_name": "Oceano em Apuros",
                    "file_type": "pdf",
                    "file_url": DOC_OCEANO,
                },
            }
        ],
    },
]

# ---------------------------------------------------------------------------
# Funções auxiliares
# ---------------------------------------------------------------------------

def register_user(client: httpx.Client, professor: dict) -> bool:
    payload = {
        "name": professor["name"],
        "email": professor["email"],
        "password": DEFAULT_PASSWORD,
        "bio": professor["bio"],
    }
    resp = client.post(f"{BACKEND_URL}/api/v1/auth/register", json=payload)
    if resp.status_code == 201:
        print(f"  ✅ Usuário criado: {professor['name']}")
        return True
    elif resp.status_code == 400 and "already registered" in resp.text:
        print(f"  ℹ️  Já existe: {professor['name']} — continuando...")
        return True
    else:
        print(f"  ❌ Erro ao registrar {professor['name']}: {resp.status_code} {resp.text}")
        return False


def login_user(client: httpx.Client, email: str) -> str | None:
    resp = client.post(
        f"{BACKEND_URL}/api/v1/auth/login",
        data={"username": email, "password": DEFAULT_PASSWORD},
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    if resp.status_code == 200:
        token = resp.json()["access_token"]
        print(f"  🔑 Login OK para {email}")
        return token
    else:
        print(f"  ❌ Falha no login de {email}: {resp.status_code} {resp.text}")
        return None


def update_profile(client: httpx.Client, token: str, professor: dict):
    update_payload = {
        k: professor.get(k)
        for k in ["location_city", "location_state", "workplace", "graduation_level"]
        if professor.get(k)
    }
    resp = client.put(
        f"{BACKEND_URL}/api/v1/auth/me",
        json=update_payload,
        headers={"Authorization": f"Bearer {token}"},
    )
    if resp.status_code == 200:
        print(f"  📝 Perfil atualizado")
    else:
        print(f"  ⚠️  Aviso ao atualizar perfil: {resp.status_code}")


def create_post(client: httpx.Client, token: str, post: dict):
    """Cria a publicação com URL permanente do documento como attachment."""
    attachment = post["attachment"]

    payload = {
        "title": post["title"],
        "content": post["content"],
        "classification": post["classification"],
        "discipline": post["discipline"],
        "tags": post["tags"],
        "steps": post["steps"],
        "attachments": [attachment],
    }

    resp = client.post(
        f"{BACKEND_URL}/api/v1/experiences",
        json=payload,
        headers={"Authorization": f"Bearer {token}"},
        timeout=30.0,
    )

    if resp.status_code == 201:
        print(f"  ✅ Post criado: \"{post['title'][:60]}...\"")
        print(f"     📎 Anexo: {attachment['file_name']} → {attachment['file_url'][:60]}...")
    else:
        print(f"  ❌ Erro ao criar post: {resp.status_code} {resp.text[:300]}")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    print("\n🌱 ProfPlatform — Seed de Dados MVP")
    print(f"   Backend:  {BACKEND_URL}")
    print(f"   Docs estáticos: /docs/ (relativo — Vercel/localhost)")
    print(f"   Cartilha: GitHub Releases v1.0-mvp\n")

    # Verificar se o backend está acessível
    try:
        r = httpx.get(f"{BACKEND_URL}/", timeout=5.0)
        print(f"✅ Backend acessível: {r.json()}\n")
    except Exception as e:
        print(f"❌ Não foi possível conectar ao backend em {BACKEND_URL}")
        print(f"   Erro: {e}")
        print("   → Certifique-se que 'docker compose up -d' está rodando (local)")
        print("   → Ou defina SEED_API_URL=https://sua-api.onrender.com\n")
        sys.exit(1)

    with httpx.Client() as client:
        for professor in PROFESSORS:
            print(f"\n{'='*60}")
            print(f"👤 Processando: {professor['name']}")
            print(f"{'='*60}")

            # 1. Registrar (ou ignorar se já existe)
            ok = register_user(client, professor)
            if not ok:
                continue

            # 2. Login para obter token
            token = login_user(client, professor["email"])
            if not token:
                continue

            # 3. Atualizar perfil com dados adicionais
            update_profile(client, token, professor)

            # 4. Criar cada post do professor (com URLs permanentes — sem upload)
            for post in professor["posts"]:
                print(f"\n  📄 Post: \"{post['title'][:55]}...\"")
                create_post(client, token, post)

    print(f"\n{'='*60}")
    print("🎉 Seed concluído!")
    print("   Local:    http://localhost:3000/dashboard")
    print("   Produção: https://bioativa.vercel.app/dashboard (após deploy)")
    print(f"{'='*60}\n")


if __name__ == "__main__":
    main()
