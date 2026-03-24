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

const stepsQuemBicho: ExperienceStep[] = [
  {
    title: "Problematização",
    description: "Alunos classificam imagens de animais com critérios próprios em uma simulação de pesquisa em floresta desconhecida.",
  },
  {
    title: "Pesquisa",
    description: "Investigação em grupos sobre características morfofisiológicas de filos específicos com tabelas comparativas.",
  },
  {
    title: "Socialização",
    description: "Apresentação dos dados e construção coletiva de uma tabela geral, com mediação docente sobre relações evolutivas.",
  },
  {
    title: "Gamificação",
    description: "Fixação de conteúdos com o jogo de cartas 'Quem é você, bicho?', usando dicas em níveis de dificuldade.",
  },
]

const stepsLagoa: ExperienceStep[] = [
  {
    title: "Preparação",
    description: "Aula invertida sobre ecologia e elaboração de questionários para entrevistas e roteiros de documentação.",
  },
  {
    title: "Campo",
    description: "Visita à Lagoa do Bebedouro para registro da biodiversidade, avaliação da poluição e entrevistas com moradores.",
  },
  {
    title: "Reflexão",
    description: "Análise dos dados, formulação de hipóteses sobre os problemas observados e proposição de soluções sustentáveis.",
  },
  {
    title: "Exibição",
    description: "Apresentação do documentário produzido para a comunidade escolar e entrega do relatório final.",
  },
]

const stepsOceano: ExperienceStep[] = [
  {
    title: "Mobilização",
    description: "Leitura compartilhada de HQ para identificar problemas socioambientais ligados ao capitalismo e às mudanças climáticas.",
  },
  {
    title: "Construção",
    description: "Estudo dos fluxos do ciclo do carbono e processos que elevam a concentração de gases de efeito estufa.",
  },
  {
    title: "Síntese",
    description: "Produção de formatos criativos, como experimentos ou peças teatrais, com base nas conclusões construídas.",
  },
]

const stepsShirley: ExperienceStep[] = [
  {
    title: "Sensibilização",
    description: "Discussão sobre impacto do desperdício alimentar e apresentação da situação-problema com vídeos e imagens.",
  },
  {
    title: "Coleta",
    description: "Investigação direta no refeitório para registrar tipos de alimentos descartados e motivos do desperdício.",
  },
  {
    title: "Organização",
    description: "Sistematização dos dados em gráficos e tabelas para estimular análise crítica e construção do conhecimento.",
  },
  {
    title: "Proposição",
    description: "Desenvolvimento de campanhas de conscientização e propostas de mudanças na distribuição da merenda.",
  },
  {
    title: "Debate",
    description: "Apresentação das descobertas e discussão coletiva sobre viabilidade das soluções sugeridas pelos grupos.",
  },
]

const stepsAulasIA: ExperienceStep[] = [
  {
    title: "Experimentação",
    description: "Realização de práticas como visualização de biomoléculas no MolView e simulações com materiais acessíveis.",
  },
  {
    title: "Coleta",
    description: "Registro rigoroso de dados experimentais, incluindo parâmetros fisiológicos e informações ambientais.",
  },
  {
    title: "Análise",
    description: "Uso de IA para interpretar dados, gerar gráficos e formular explicações científicas baseadas em evidências.",
  },
  {
    title: "Comunicação",
    description: "Produção de materiais visuais e campanhas de conscientização para divulgar resultados à comunidade escolar.",
  },
]

const stepsMisteriosGeneticos: ExperienceStep[] = [
  {
    title: "Modelagem",
    description: "Construção de maquetes tridimensionais do DNA com foco no pareamento correto das bases nitrogenadas.",
  },
  {
    title: "Memorização",
    description: "Criação e votação de mnemônicos para facilitar retenção das Leis de Mendel e conceitos complexos.",
  },
  {
    title: "Treinamento",
    description: "Uso do Teachable Machine para treinar modelos de IA que identificam pareamentos corretos e incorretos.",
  },
  {
    title: "Aplicação",
    description: "Discussão de casos reais, como albinismo, e reflexão crítica sobre o impacto das tecnologias na ciência.",
  },
]

const stepsJoelto: ExperienceStep[] = [
  {
    title: "Introdução",
    description: "Aprofundamento teórico sobre Educação Ambiental e os 5Rs com exposição dialogada e vídeos educativos.",
  },
  {
    title: "Investigação",
    description: "Pesquisa de campo sobre tipos e quantidade de resíduos produzidos na escola e nas residências dos alunos.",
  },
  {
    title: "Produção",
    description: "Elaboração e apresentação de paródias, cordéis ou stands sobre reciclagem e compostagem para a comunidade escolar.",
  },
]

const cartilhaUrl = "https://github.com/Cieliocas/ProfPlatform/releases/download/v1.0-mvp/Cartilha_Aulas_Praticas_Biologia_IA.pdf"

export const experiences: Experience[] = [
  {
    id: "real-0",
    title: "QUEM É VOCÊ, BICHO",
    content:
      "Sequência didática sobre classificação animal e características morfofisiológicas dos filos, com protagonismo estudantil, ludicidade e aprendizagem leve no Ensino Médio.",
    classification: "Sequência didática investigativa",
    discipline: "Biologia",
    steps: stepsQuemBicho,
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
    comments: [
      {
        id: 1001,
        authorName: "Prof. Mateus",
        createdAt: "2026-03-21T10:20:00.000Z",
        text: "Adorei a ludicidade do jogo 'Quem é você, bicho?'. No meu trabalho com Genética, usei IA para classificar imagens; você acha que daria para integrar uma etapa onde os alunos treinam uma IA para reconhecer os filos que pesquisaram?",
        replies: [
          {
            id: 1002,
            authorName: "Prof(a) Fabiana",
            createdAt: "2026-03-21T11:05:00.000Z",
            text: "Com certeza! Integrar o reconhecimento de imagem da sua cartilha tornaria a etapa de pesquisa ainda mais tecnológica e alinhada com o interesse atual dos alunos.",
          },
        ],
      },
    ],
  },
  {
    id: "real-1",
    title: "LUZ, CÂMERA E AÇÃO NA LAGOA: O OLHAR SOB A PERSPECTIVA DA EDUCAÇÃO AMBIENTAL CRÍTICA",
    content:
      "Investigação prática de ecologia e saúde única no Parque Ambiental Lagoa do Bebedouro, com produção de documentários audiovisuais e análise crítica dos problemas socioambientais.",
    classification: "Sequência didática investigativa",
    discipline: "Biologia",
    steps: stepsLagoa,
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
    comments: [
      {
        id: 1101,
        authorName: "Prof(a) Maria",
        createdAt: "2026-03-20T14:15:00.000Z",
        text: "Excelente uso do documentário! Na minha prática com desperdício de alimentos, notei que o registro visual motiva muito os alunos. Como foi a recepção dos moradores locais às entrevistas dos estudantes?",
        replies: [
          {
            id: 1102,
            authorName: "Prof. Leonardo",
            createdAt: "2026-03-20T15:02:00.000Z",
            text: "Foi surpreendente! Os alunos se sentiram verdadeiros jornalistas e os moradores ficaram felizes em compartilhar a história da Lagoa, o que fortaleceu o sentimento de pertencimento da turma.",
          },
        ],
      },
    ],
  },
  {
    id: "real-2",
    title: "OCEANO EM APUROS: QUEM É O CULPADO NESSA HISTÓRIA",
    content:
      "Sequência didática que utiliza educomunicação e histórias em quadrinhos para abordar o ciclo do carbono e os impactos das mudanças climáticas nos oceanos.",
    classification: "Sequência didática investigativa",
    discipline: "Biologia",
    steps: stepsOceano,
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
      "Proposta para reduzir o desperdício de alimentos na escola com Aprendizagem Baseada em Problemas (ABP), engajando alunos do Ensino Médio em soluções reais.",
    classification: "Sequência didática investigativa",
    discipline: "Biologia",
    steps: stepsShirley,
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
    comments: [
      {
        id: 1301,
        authorName: "Prof. Mateus",
        createdAt: "2026-03-22T09:30:00.000Z",
        text: "Nossas temáticas sobre resíduos se complementam muito bem. Você chegou a considerar o uso de compostagem para os resíduos orgânicos identificados no refeitório, como sugeri na minha sequência?",
        replies: [
          {
            id: 1302,
            authorName: "Prof(a) Fabiana",
            createdAt: "2026-03-22T10:10:00.000Z",
            text: "Sim! Inclusive a ideia de campanhas de conscientização que propusemos pode desembocar justamente na criação de uma horta escolar adubada por essa compostagem.",
          },
        ],
      },
    ],
  },
  {
    id: "real-4",
    title: "Aulas Práticas: Biologia com uso de IA no Ensino médio.",
    content:
      "Guia de roteiros práticos que unem conceitos biológicos a ferramentas de IA generativa para promover autonomia e pensamento investigativo no Ensino Médio.",
    classification: "Sequência didática investigativa",
    discipline: "Biologia",
    steps: stepsAulasIA,
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
      "Sequência em genética que integra construção de maquetes, técnicas mnemônicas e inteligência artificial para facilitar memorização e análise de padrões.",
    classification: "Sequência didática investigativa",
    discipline: "Biologia",
    steps: stepsMisteriosGeneticos,
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
    comments: [
      {
        id: 1501,
        authorName: "Prof(a) Maria",
        createdAt: "2026-03-19T16:20:00.000Z",
        text: "O uso do Teachable Machine para visualizar erros genéticos é genial. Penso que eu poderia usar essa lógica para os alunos classificarem diferentes tipos de fitoplâncton e entenderem sua importância no ciclo do carbono oceânico.",
        replies: [
          {
            id: 1502,
            authorName: "Prof. Leonardo",
            createdAt: "2026-03-19T17:00:00.000Z",
            text: "Essa aplicação seria fantástica! A IA ajuda a tornar visível o microscópico, facilitando a compreensão da conexão entre a biologia celular e os impactos globais que você aborda.",
          },
        ],
      },
    ],
  },
  {
    id: "real-6",
    title: "Consumo, redução e destino sustentáveis dos resíduos sólidos",
    content:
      "Sequência didática para conscientizar sobre impactos dos resíduos sólidos, promovendo consumo consciente e descarte adequado por meio de metodologias ativas e produções criativas.",
    classification: "Sequência didática investigativa",
    discipline: "Biologia",
    steps: stepsJoelto,
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
