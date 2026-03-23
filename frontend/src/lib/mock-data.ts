export interface ExperienceStep {
  title: string
  description?: string
}

export interface CommentReply {
  id: number
  authorName: string
  createdAt: string
  text: string
}

export interface CommentThread {
  id: number
  authorName: string
  createdAt: string
  text: string
  replies?: CommentReply[]
}

export interface Experience {
  id: string
  title: string
  content: string
  classification: string
  discipline: string
  steps: ExperienceStep[]
  attachments: Attachment[]
  tags: string[]
  upvotes: number
  savedCount: number
  appliedCount: number
  createdAt: string
  author: Author
  comments?: CommentThread[]
}

export interface Author {
  id: string
  name: string
  bio: string
  avatarUrl: string
  experienceCount: number
}

export interface Attachment {
  file_name: string
  file_type: string
  file_url: string
}

export const authors: Author[] = [
  {
    id: "1",
    name: "Suzianne Raquel Valadares Sales Sousa",
    bio: "Professora de Biologia no Ensino Medio, com foco em sequencias didaticas investigativas e educacao cientifica.",
    avatarUrl: "/suzianne-photo.jpeg",
    experienceCount: 1,
  },
  {
    id: "2",
    name: "Samara Oliveira da Silva",
    bio: "Professora de Biologia no Ensino Medio, com foco em educacao ambiental e investigacao cientifica.",
    avatarUrl: "",
    experienceCount: 2,
  },
  {
    id: "3",
    name: "Shirley de Sousa Brito",
    bio: "Professora de Biologia com enfase em sustentabilidade e seguranca alimentar no ambiente escolar.",
    avatarUrl: "",
    experienceCount: 1,
  },
  {
    id: "4",
    name: "Roberth Cipriano",
    bio: "Professor de Biologia com atuacao em genetica, metodologias ativas e uso de IA no Ensino Medio.",
    avatarUrl: "",
    experienceCount: 2,
  },
  {
    id: "5",
    name: "Joelto Pires Messias",
    bio: "Professor de Biologia com foco em educacao ambiental, consumo consciente e gestao sustentavel de residuos no Ensino Medio.",
    avatarUrl: "",
    experienceCount: 1,
  },
]

const defaultSteps: ExperienceStep[] = [
  { title: "Problematizacao", description: "Introducao ao problema investigativo e contextualizacao biologica." },
  { title: "Hipotese", description: "Levantamento de hipoteses com base em dados e observacoes iniciais." },
  { title: "Coleta de Dados", description: "Registro das evidencias produzidas durante a sequencia didatica." },
  { title: "Conclusao", description: "Analise final dos resultados e socializacao das descobertas." },
]

const cartilhaUrl = "https://github.com/Cieliocas/ProfPlatform/releases/download/v1.0-mvp/Cartilha_Aulas_Praticas_Biologia_IA.pdf"

export const experiences: Experience[] = [
  {
    id: "real-0",
    title: "“QUEM É VOCÊ, BICHO?”",
    content:
      "Sequencia didatica investigativa de referencia para o Ensino Medio, com foco na identificacao biologica, observacao sistematica e construcao de argumentos cientificos.",
    classification: "Sequência didática investigativa",
    discipline: "Biologia",
    steps: defaultSteps,
    attachments: [
      {
        file_name: "Suzianne Raquel Valadares Sales Sousa - corrigido e enviado (2).pdf",
        file_type: "pdf",
        file_url: "/docs/Suzianne_Raquel_Valadares_Sales_Sousa_corrigido_e_enviado_2.pdf",
      },
    ],
    tags: ["Ecologia", "Primeira serie", "Interdisciplinar", "Geografia"],
    upvotes: 58,
    savedCount: 44,
    appliedCount: 23,
    createdAt: "2026-03-23",
    author: authors[0],
  },
  {
    id: "real-1",
    title: "LUZ, CÂMERA E AÇÃO NA LAGOA: O OLHAR SOB A PERSPECTIVA DA EDUCAÇÃO AMBIENTAL CRÍTICA",
    content:
      "Sequencia didatica investigativa com foco em educacao ambiental critica. A proposta envolve observacao de campo, analise de impactos e discussao de intervencoes locais.",
    classification: "Sequência didática investigativa",
    discipline: "Biologia",
    steps: defaultSteps,
    attachments: [
      {
        file_name: "Planejamento AASA (Samara) Final.pdf",
        file_type: "pdf",
        file_url: "/docs/Planejamento_AASA_Samara.pdf",
      },
    ],
    tags: ["Ecologia", "Segunda serie", "Interdisciplinar", "Geografia"],
    upvotes: 42,
    savedCount: 28,
    appliedCount: 16,
    createdAt: "2026-03-20",
    author: authors[1],
  },
  {
    id: "real-2",
    title: "OCEANO EM APUROS: QUEM É O CULPADO NESSA HISTÓRIA?",
    content:
      "Sequencia didatica sobre poluicao marinha e impactos ecologicos. Os estudantes investigam causas, efeitos e responsabilidades a partir de dados e fontes cientificas.",
    classification: "Sequência didática investigativa",
    discipline: "Biologia",
    steps: defaultSteps,
    attachments: [
      {
        file_name: "Oceano em apuros.pdf",
        file_type: "pdf",
        file_url: "/docs/Oceano_em_Apuros.pdf",
      },
    ],
    tags: ["Ecologia", "Terceira serie", "Interdisciplinar", "Quimica"],
    upvotes: 37,
    savedCount: 25,
    appliedCount: 13,
    createdAt: "2026-03-19",
    author: authors[1],
  },
  {
    id: "real-3",
    title: "Consciência e Ação: Estratégias para Reduzir o Desperdício de Alimentos na Escola",
    content:
      "Sequencia didatica investigativa sobre desperdicio de alimentos no contexto escolar, integrando Biologia e educacao ambiental.",
    classification: "Sequência didática investigativa",
    discipline: "Biologia",
    steps: defaultSteps,
    attachments: [
      {
        file_name: "AASA_Shirley de Sousa Brito.docx",
        file_type: "docx",
        file_url: "/docs/AASA_Shirley_de_Sousa_Brito.docx",
      },
    ],
    tags: ["Ecologia", "Segunda serie", "Interdisciplinar", "Sustentabilidade"],
    upvotes: 33,
    savedCount: 22,
    appliedCount: 11,
    createdAt: "2026-03-18",
    author: authors[2],
  },
  {
    id: "real-4",
    title: "Aulas Práticas: Biologia com uso de IA no Ensino médio.",
    content:
      "Material didatico com propostas de aulas praticas e investigativas em Biologia, com apoio de ferramentas de IA para analise e comunicacao de dados.",
    classification: "Sequência didática investigativa",
    discipline: "Biologia",
    steps: defaultSteps,
    attachments: [
      {
        file_name: "Cartilha de Aulas Práticas_Biologia com IA.pdf",
        file_type: "pdf",
        file_url: cartilhaUrl,
      },
    ],
    tags: ["Genetica", "Primeira serie", "Interdisciplinar", "Matematica"],
    upvotes: 48,
    savedCount: 34,
    appliedCount: 19,
    createdAt: "2026-03-17",
    author: authors[3],
  },
  {
    id: "real-5",
    title: "DESVENDANDO OS MISTÉRIOS GENÉTICOS: APRENDIZAGEM DE MÁQUINAS E LIGAÇÕES MNEMÔNICAS NO ENSINO DA GENÉTICA.",
    content:
      "Sequencia didatica investigativa em Genetica com articulacao entre aprendizagem de maquinas, recursos mnemotecnicos e investigacao de conceitos no Ensino Medio.",
    classification: "Sequência didática investigativa",
    discipline: "Biologia",
    steps: defaultSteps,
    attachments: [
      {
        file_name: "BSA_APRESENTAÇÃO AASA_PROF ROBERTH, TURMA 06, 2024.pdf",
        file_type: "pdf",
        file_url: "/docs/BSA_Apresentacao_AASA_Prof_Roberth.pdf",
      },
    ],
    tags: ["Genetica", "Segunda serie", "Interdisciplinar", "Tecnologia"],
    upvotes: 45,
    savedCount: 31,
    appliedCount: 17,
    createdAt: "2026-03-16",
    author: authors[3],
  },
  {
    id: "real-6",
    title: "Consumo, redução e destino sustentáveis dos resíduos sólidos",
    content:
      "Sequencia didatica investigativa com foco em consumo consciente, reducao de residuos e destinacao sustentavel no contexto escolar e comunitario.",
    classification: "Sequência didática investigativa",
    discipline: "Biologia",
    steps: defaultSteps,
    attachments: [
      {
        file_name: "Sequência didática - Consumo, redução e destino sustentáveis dos resíduos sólidos.pdf",
        file_type: "pdf",
        file_url: "/docs/Joelto_Pires_Messias_Consumo_Reducao_Destino_Residuos_Solidos.pdf",
      },
    ],
    tags: ["Ecologia", "Terceira serie", "Interdisciplinar", "Sustentabilidade"],
    upvotes: 26,
    savedCount: 18,
    appliedCount: 9,
    createdAt: "2026-03-23",
    author: authors[4],
  },
]

export const allTags = [
  "Ecologia",
  "Genetica",
  "Interdisciplinar",
  "Sustentabilidade",
  "Tecnologia",
  "Matematica",
]

export const classifications = [
  "Sequência didática investigativa",
  "Informação",
]

export const disciplines = [
  "Biologia",
]

export const highSchoolYears = [
  "Primeira serie",
  "Segunda serie",
  "Terceira serie",
]

export const biologyAxes = [
  "Ecologia",
  "Genetica",
]

export const interconnectOptions = [
  "Quimica",
  "Geografia",
  "Matematica",
  "Tecnologia",
]
