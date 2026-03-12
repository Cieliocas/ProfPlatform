import { UserPlus, PenLine, Compass } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Crie sua Conta",
    description:
      "Cadastre-se rapidamente com seu email ou conta Google. Em poucos segundos voce ja faz parte da comunidade.",
  },
  {
    number: "02",
    icon: PenLine,
    title: "Compartilhe uma SDI",
    description:
      "Descreva sua sequencia didatica, o contexto, o passo a passo e os materiais usados. Adicione tags para facilitar a busca.",
  },
  {
    number: "03",
    icon: Compass,
    title: "Explore e Aplique",
    description:
      'Navegue pelo feed, filtre por eixo da Biologia e descubra ideias para sua proxima aula. Se funcionou, clique em "Apliquei e deu certo!".',
  },
]

export function HowItWorks() {
  return (
    <section className="bg-secondary py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-moss">
            Como funciona
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Simples como deve ser
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Sabemos que seu tempo e precioso. Por isso, simplificamos tudo.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.number} className="relative flex flex-col items-center text-center">
              {i < steps.length - 1 && (
                <div
                  className="absolute left-1/2 top-10 hidden h-px w-full bg-border md:block"
                  aria-hidden="true"
                />
              )}
              <div className="relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-card shadow-sm">
                <step.icon className="h-8 w-8 text-navy" />
                <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-mustard text-xs font-bold text-navy">
                  {step.number}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
