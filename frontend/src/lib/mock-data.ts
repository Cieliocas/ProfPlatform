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

const authorSeeds = [
  { name: "Ana Beatriz Silva", bio: "Professora de Biologia com foco em ecologia e projetos de campo." },
  { name: "Carlos Eduardo Santos", bio: "Professor de Biologia celular e investigador de metodologias ativas." },
  { name: "Maria Lucia Ferreira", bio: "Atua com genetica e biotecnologia no Ensino Medio." },
  { name: "Roberto Almeida", bio: "Especialista em zoologia e conservacao da fauna local." },
  { name: "Juliana Mendes", bio: "Apaixonada por citologia e cultura maker em laboratorios escolares." },
  { name: "Fernanda Duarte", bio: "Docente de botânica e estudos de biodiversidade." },
  { name: "Rafael Costa", bio: "Professor de fisiologia humana e saude preventiva." },
  { name: "Camila Ribeiro", bio: "Pesquisa sobre microbiologia e educacao cientifica." },
  { name: "Thiago Martins", bio: "Atua com genetica de populacoes e estudos de caso." },
  { name: "Larissa Nogueira", bio: "Coordena projetos interdisciplinares em Biologia e Quimica." },
  { name: "Patricia Gomes", bio: "Trabalha com sustentabilidade e educacao ambiental." },
  { name: "Diego Araujo", bio: "Professor de biologia marinha e ecossistemas costeiros." },
  { name: "Renata Campos", bio: "Foco em evolucao e biodiversidade regional." },
  { name: "Marcos Vinicius Rocha", bio: "Pesquisa sobre bioindicadores e qualidade da agua." },
  { name: "Livia Medeiros", bio: "Coordena projetos de investigacao em escolas publicas." },
]

export const authors: Author[] = authorSeeds.map((author, index) => ({
  id: String(index + 1),
  name: author.name,
  bio: author.bio,
  avatarUrl: "",
  experienceCount: 3,
}))

const stepSets: ExperienceStep[][] = [
  [
    { title: "Problematizacao", description: "Contextualize o tema e levante questoes iniciais." },
    { title: "Hipotese", description: "Organize as ideias e formule hipoteses em grupo." },
    { title: "Coleta de Dados", description: "Planeje e realize a coleta com instrumentos simples." },
    { title: "Conclusao", description: "Compare resultados e registre evidencias." },
  ],
  [
    { title: "Observacao Inicial", description: "Mapeie o problema biologico no entorno." },
    { title: "Planejamento", description: "Defina variaveis e criterios de analise." },
    { title: "Monitoramento", description: "Colete dados periodicamente." },
    { title: "Analise", description: "Organize dados e compare com a literatura." },
    { title: "Compartilhamento", description: "Socialize conclusoes em formato de seminario." },
  ],
  [
    { title: "Questao Norteadora", description: "Apresente o desafio central aos estudantes." },
    { title: "Investigacao", description: "Divida tarefas e realize experimentos." },
    { title: "Sintese", description: "Construa mapas conceituais e relatorios." },
    { title: "Aplicacao", description: "Transfira o aprendizado para novos cenarios." },
  ],
]

const titles = [
  "Como a biodiversidade local responde a areas urbanizadas?",
  "Quais fatores alteram a taxa de germinacao das sementes?",
  "Como a poluicao impacta os bioindicadores aquaticos?",
  "Como as mudancas climaticas afetam os polinizadores locais?",
  "O que muda na fotossintese quando variamos luz e agua?",
  "Como o uso do solo influencia a fauna do entorno escolar?",
  "Por que as doencas respiratorias aumentam em periodos secos?",
  "Como o microbioma do solo varia em hortas escolares?",
  "Quais evidencias indicam adaptacoes em ambientes urbanos?",
  "Como a qualidade da agua interfere na cadeia alimentar?",
  "O que determina o sucesso reprodutivo de plantas nativas?",
  "Como o lixo urbano afeta a vida marinha costeira?",
  "Quais fatores influenciam o comportamento de insetos?",
  "Como a genetica de populacoes aparece em estudos locais?",
  "Qual o impacto do desmatamento na biodiversidade?",
]

const axisTags = ["Ecologia", "Genetica", "Citologia", "Zoologia", "Botanica", "Fisiologia"]
const yearTags = ["Primeira série", "Segunda série", "Terceira série"]
const connections = ["Quimica", "Geografia", "Matematica", "Historia"]

const attachmentPool: Attachment[] = [
  { file_name: "roteiro_investigacao.pdf", file_type: "pdf", file_url: "/mock/roteiro_investigacao.pdf" },
  { file_name: "planilha_coleta.xlsx", file_type: "xlsx", file_url: "/mock/planilha_coleta.xlsx" },
  { file_name: "guia_pratico.docx", file_type: "docx", file_url: "/mock/guia_pratico.docx" },
  { file_name: "mapa_campo.jpg", file_type: "jpg", file_url: "/mock/mapa_campo.jpg" },
  { file_name: "https://dados.biodiversidade.gov.br", file_type: "link", file_url: "https://dados.biodiversidade.gov.br" },
]

const commentSets = [
  [
    {
      id: 1,
      authorName: "Livia Medeiros",
      createdAt: "2026-03-05",
      text: "Adorei a sequencia. Como voce conduziu a etapa de hipotese com a turma do 1o ano?",
      replies: [
        {
          id: 11,
          authorName: "Ana Beatriz Silva",
          createdAt: "2026-03-06",
          text: "Usei fichas guiadas e exemplos locais para ajudar na formulacao das hipoteses."
        }
      ]
    },
    {
      id: 2,
      authorName: "Rafael Costa",
      createdAt: "2026-03-07",
      text: "Os dados ficaram bem ricos. Voce recomendaria repetir a coleta por mais semanas?",
    }
  ],
  [
    {
      id: 3,
      authorName: "Camila Ribeiro",
      createdAt: "2026-03-02",
      text: "Usei a proposta com meus alunos e eles se engajaram muito.",
      replies: [
        {
          id: 12,
          authorName: "Roberto Almeida",
          createdAt: "2026-03-03",
          text: "Que bom! Se quiser, posso compartilhar a rubrica de avaliacao que usei."
        }
      ]
    }
  ],
  [
    {
      id: 4,
      authorName: "Patricia Gomes",
      createdAt: "2026-03-01",
      text: "Sugiro incluir um momento de devolutiva para a comunidade escolar.",
      replies: [
        {
          id: 13,
          authorName: "Juliana Mendes",
          createdAt: "2026-03-02",
          text: "Boa ideia. Estou planejando um mural de resultados com os estudantes."
        }
      ]
    }
  ],
]

const createExperience = (author: Author, index: number, variant: number): Experience => {
  const axis = axisTags[index % axisTags.length]
  const year = yearTags[(index + variant) % yearTags.length]
  const connection = connections[(index + variant) % connections.length]
  const baseTitle = titles[(index + variant) % titles.length]
  const steps = stepSets[(index + variant) % stepSets.length]
  const attachments = [
    attachmentPool[(index + variant) % attachmentPool.length],
    attachmentPool[(index + variant + 2) % attachmentPool.length],
  ]

  const baseComments = (index + variant) % 4 === 0 ? commentSets[(index + variant) % commentSets.length] : undefined
  const comments = baseComments
    ? baseComments.map((comment) => ({
      ...comment,
      replies: comment.replies
        ? comment.replies.map((reply) => ({ ...reply, authorName: author.name }))
        : comment.replies
    }))
    : undefined

  return {
    id: `${index + 1}-${variant + 1}`,
    title: baseTitle,
    content:
      "Esta sequencia didatica investigativa foi estruturada para aproximar os estudantes do metodo cientifico. " +
      "Inclui levantamento de dados locais, discussao em grupo e producao de registros. " +
      "A proposta pode ser adaptada conforme o tempo disponivel e o contexto da turma.",
    classification: "Sequência didática investigativa",
    discipline: "Biologia",
    steps,
    attachments,
    tags: [axis, year, "Interdisciplinar", connection],
    upvotes: 18 + ((index + 1) * (variant + 2)) % 40,
    savedCount: 10 + ((index + 2) * (variant + 3)) % 35,
    appliedCount: 4 + ((index + 3) * (variant + 4)) % 12,
    createdAt: `2026-02-${String(10 + ((index + variant) % 18)).padStart(2, "0")}`,
    author,
    comments,
  }
}

export const experiences: Experience[] = authors.flatMap((author, index) => {
  return [0, 1, 2].map((variant) => createExperience(author, index, variant))
})

export const allTags = [
  "Ecologia",
  "Genetica",
  "Citologia",
  "Zoologia",
  "Botanica",
  "Fisiologia",
  "Interdisciplinar",
  "Microbiologia",
  "Bioindicadores",
  "Metodo Cientifico",
  "Saude",
  "Sustentabilidade",
  "Comunidade",
]

export const classifications = [
  "Sequência didática investigativa",
  "Sequência didática",
  "Informação",
]

export const disciplines = [
  "Biologia",
]

export const highSchoolYears = [
  "Primeira série",
  "Segunda série",
  "Terceira série",
]

export const biologyAxes = [
  "Ecologia",
  "Genetica",
  "Citologia",
  "Zoologia",
  "Botanica",
  "Fisiologia",
]

export const interconnectOptions = [
  "Quimica",
  "Geografia",
  "Matematica",
  "Historia",
]
