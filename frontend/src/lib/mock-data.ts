export interface Experience {
  id: string
  title: string
  content: string
  classification: string
  discipline: string
  attachments: string[]
  tags: string[]
  upvotes: number
  savedCount: number
  commentsCount: number
  createdAt: string
  author: Author
}

export interface Author {
  id: string
  name: string
  bio: string
  avatarUrl: string
  experienceCount: number
}

export const authors: Author[] = [
  {
    id: "1",
    name: "Ana Beatriz Silva",
    bio: "Professora de Biologia apaixonada por experimentacao. 15 anos de experiencia no ensino medio.",
    avatarUrl: "",
    experienceCount: 12,
  },
  {
    id: "2",
    name: "Carlos Eduardo Santos",
    bio: "Professor de Fisica e entusiasta de tecnologias educacionais. Mestre em Educacao.",
    avatarUrl: "",
    experienceCount: 8,
  },
  {
    id: "3",
    name: "Maria Lucia Ferreira",
    bio: "Professora de Quimica. Trabalho com experimentos de baixo custo ha 20 anos.",
    avatarUrl: "",
    experienceCount: 23,
  },
  {
    id: "4",
    name: "Roberto Almeida",
    bio: "Professor de Biologia voltado para Ecologia. Acredito em projetos interdisciplinares.",
    avatarUrl: "",
    experienceCount: 6,
  },
  {
    id: "5",
    name: "Juliana Mendes",
    bio: "Professora de Quimica e Fisica. Foco em introducao cientifica estruturada.",
    avatarUrl: "",
    experienceCount: 15,
  },
]

export const experiences: Experience[] = [
  {
    id: "1",
    title: "Horta Pedagogica: Biologia na Pratica",
    content:
      "Turma do 1o ano com dificuldade em compreender fotossintese. Decidi trazer a teoria para fora da sala de aula criando uma horta no patio da escola.\n\nPasso a passo:\n1. Apresentacao teorica sobre fotossintese\n2. Divisao em grupos e planejamento da horta\n3. Preparacao do solo e plantio\n4. Observacao e registro semanal em diario de campo",
    classification: "Sequência didática",
    discipline: "Biologia",
    attachments: [],
    tags: ["Pratica", "Meio Ambiente", "Interdisciplinar"],
    upvotes: 47,
    savedCount: 23,
    commentsCount: 8,
    createdAt: "2026-02-15",
    author: authors[0],
  },
  {
    id: "2",
    title: "Fisica com Lancamento de Foguetes Caseiros",
    content:
      "Alunos do 2o ano do Ensino Medio desmotivados com cinematica. Criei uma abordagem gamificada onde os conceitos fisicos sao aplicados no lancamento de foguetes de garrafa PET.",
    classification: "Plano de aula simples",
    discipline: "Física",
    attachments: [],
    tags: ["Gamificacao", "Cinematica", "Experimento"],
    upvotes: 35,
    savedCount: 19,
    commentsCount: 12,
    createdAt: "2026-02-10",
    author: authors[1],
  },
  {
    id: "3",
    title: "Tabela Periodica Interativa com QR Codes",
    content:
      "Dificuldade de memorizacao e abstracao da tabela periodica. Usei QR codes colados nas paredes do laboratorio onde cada aluno 'cacou' elementos quimicos e montamos uma tabela viva.",
    classification: "Experiência comum",
    discipline: "Química",
    attachments: [],
    tags: ["Tecnologia", "Laboratorio", "Criatividade"],
    upvotes: 62,
    savedCount: 41,
    commentsCount: 15,
    createdAt: "2026-02-08",
    author: authors[2],
  },
  {
    id: "4",
    title: "Levantamento Ecologico Local",
    content:
      "Projeto de Biologia sobre o ecossistema local. Os alunos mapearam a flora e fauna do entorno da escola e catalogaram em um app colaborativo.",
    classification: "Sequência didática",
    discipline: "Biologia",
    attachments: ["https://example.com/pdf_example.pdf"],
    tags: ["Ecologia", "Projeto", "Comunidade"],
    upvotes: 28,
    savedCount: 14,
    commentsCount: 5,
    createdAt: "2026-02-05",
    author: authors[3],
  },
  {
    id: "5",
    title: "Informacao: Olimpiada Nacional de Ciencias",
    content:
      "Dicas sobre como inscrever a escola na proxima Olimpiada Nacional de Ciencias (ONC) e sugestoes de livros para preparacao da equipe de professores.",
    classification: "Informação",
    discipline: "Biologia",
    attachments: [],
    tags: ["Olimpiada", "Inscricao"],
    upvotes: 53,
    savedCount: 32,
    commentsCount: 18,
    createdAt: "2026-02-01",
    author: authors[4],
  },
  {
    id: "6",
    title: "Laboratorio de Quimica com Materiais Caseiros",
    content:
      "Escola sem laboratorio de ciencias. Adaptei experimentos classicos de quimica usando materiais encontrados em casa, como vinagre, bicarbonato e corantes alimenticios.",
    classification: "Plano de aula simples",
    discipline: "Química",
    attachments: ["https://example.com/image_example.jpg"],
    tags: ["Experimento", "Baixo Custo"],
    upvotes: 41,
    savedCount: 27,
    commentsCount: 9,
    createdAt: "2026-01-28",
    author: authors[0],
  },
]

export const allTags = [
  "Ciencias",
  "Matematica",
  "Historia",
  "Lingua Portuguesa",
  "Educacao Infantil",
  "Arte",
  "Gamificacao",
  "Pratica",
  "Projeto",
  "Interdisciplinar",
  "Criatividade",
  "Meio Ambiente",
  "Baixo Custo",
  "Leitura",
  "Escrita Criativa",
  "Comunidade",
  "Linguagem",
  "Experimento",
  "Algebra",
]

export const classifications = [
  "Plano de aula simples",
  "Sequência didática",
  "Experiência comum",
  "Informação",
]

export const disciplines = [
  "Biologia",
  "Química",
  "Física",
]
