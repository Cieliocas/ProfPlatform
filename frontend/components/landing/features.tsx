import { Share2, Search, Bookmark, ThumbsUp, UserCircle, Tags } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Share2,
    title: "Compartilhe Praticas",
    description:
      "Publique seus planos de aula, atividades e metodologias com um editor intuitivo. Adicione anexos, imagens e tags.",
    color: "bg-mustard/15 text-mustard",
  },
  {
    icon: Search,
    title: "Busca com Filtros",
    description:
      "Encontre experiencias por disciplina, faixa etaria, duracao da atividade ou palavras-chave especificas.",
    color: "bg-moss/15 text-moss",
  },
  {
    icon: ThumbsUp,
    title: "Apliquei e Deu Certo!",
    description:
      "Valide as praticas de outros professores. Um feedback real que mostra o que funciona na sala de aula.",
    color: "bg-navy/15 text-navy",
  },
  {
    icon: Bookmark,
    title: "Salve para Depois",
    description:
      "Favorite as experiencias que mais chamaram sua atencao e acesse-as facilmente no seu perfil.",
    color: "bg-mustard/15 text-mustard",
  },
  {
    icon: UserCircle,
    title: "Portfolio do Professor",
    description:
      "Construa seu portfolio digital pedagogico, mostrando suas experiencias, bio e area de atuacao.",
    color: "bg-moss/15 text-moss",
  },
  {
    icon: Tags,
    title: "Organizacao por Tags",
    description:
      "Categorize cada experiencia com tags para facilitar a descoberta por outros educadores da comunidade.",
    color: "bg-navy/15 text-navy",
  },
]

export function Features() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-moss">
            Funcionalidades
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Tudo que voce precisa para compartilhar e descobrir
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Ferramentas pensadas para o dia a dia do professor, simples de usar e
            poderosas nos resultados.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="border-border bg-card transition-shadow hover:shadow-md"
            >
              <CardContent className="flex flex-col gap-4 p-6">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-lg ${feature.color}`}
                >
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
