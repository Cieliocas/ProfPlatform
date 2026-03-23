"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, BookMarked, GraduationCap, Leaf, Sparkles, Star } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/src/contexts/AuthContext"

const recommendedCards = [
  {
    id: "suzianne-sdi",
    type: "SDI da Suzianne",
    title: "“QUEM É VOCÊ, BICHO?”",
    summary:
      "Abstração do post real com foco em investigação, observação de campo e construção de hipóteses no Ensino Médio.",
    byline: "Prof. Suzianne Valadares",
    footer: "Sequência Didática Investigativa",
    hrefLoggedIn: "/experiencia/real-0",
    hrefLoggedOut: "/login",
    requiresAuth: true,
    icon: "graduation",
  },
  {
    id: "joelto-ref",
    type: "Referência de Professor",
    title: "Consumo, redução e destino sustentável dos resíduos sólidos",
    summary:
      "Exemplo de sequência didática com enfoque em sustentabilidade, consumo consciente e análise crítica do destino de resíduos.",
    byline: "Prof. Joelto Pires Messias",
    footer: "Post de referência da comunidade",
    hrefLoggedIn: "/experiencia/real-6",
    hrefLoggedOut: "/login",
    requiresAuth: true,
    icon: "leaf",
  },
  {
    id: "uespi-2026",
    type: "Livro UESPI 2026",
    title: "Metodologias Ativas - Volume 07",
    summary:
      "Publicação mais recente da UESPI para apoiar o planejamento de sequências didáticas e práticas investigativas em Biologia.",
    byline: "Editora UESPI",
    footer: "Acervo UESPI",
    hrefLoggedIn: "/livros-uespi",
    hrefLoggedOut: "/livros-uespi",
    requiresAuth: false,
    icon: "book",
    coverUrl: "/uespi-books/covers/sequenciaVol07.pdf.png",
  },
] as const

export function SuzianneSpotlight() {
  const { user } = useAuth()

  const getIcon = (icon: (typeof recommendedCards)[number]["icon"]) => {
    if (icon === "graduation") return <GraduationCap className="h-4 w-4 text-moss" />
    if (icon === "leaf") return <Leaf className="h-4 w-4 text-moss" />
    return <BookMarked className="h-4 w-4 text-moss" />
  }

  return (
    <section className="bg-[#F8FAFC] py-14">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 lg:grid-cols-12 lg:px-8">
        <Card className="lg:col-span-4 rounded-2xl border-border bg-white p-6 shadow-sm md:p-7">
          <div className="flex flex-col items-center text-center">
            <div className="relative h-36 w-36 overflow-hidden rounded-full ring-4 ring-moss/15">
              <Image
                src="/suzianne-photo.jpeg"
                alt="Professora Suzianne Valadares"
                fill
                className="object-cover"
                sizes="144px"
              />
            </div>
            <p className="mt-5 text-[11px] font-semibold uppercase tracking-widest text-moss">Idealização do projeto</p>
            <h2 className="mt-2 text-xl font-bold text-navy md:text-2xl">Professora Suzianne Valadares</h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Idealizadora da plataforma e mestranda. A proposta destaca Sequências Didáticas Investigativas para o Ensino Médio em Biologia.
            </p>
          </div>
        </Card>

        <Card className="lg:col-span-8 rounded-2xl border-border bg-white p-6 shadow-sm md:p-7">
          <div className="mb-5 grid gap-4 lg:grid-cols-[180px_1fr]">
            <div className="rounded-xl bg-mustard/90 p-4 text-navy">
              <p className="text-xs font-semibold uppercase tracking-widest">Curadoria</p>
              <p className="mt-2 text-2xl font-bold leading-none">Top 3</p>
              <p className="mt-2 text-sm">Indicações para inspirar a produção de SDIs em Biologia.</p>
              <div className="mt-3 flex gap-1 text-navy">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-moss">
                Conteúdo recomendado pela prof. suzianne
              </p>
              <h3 className="mt-1 text-2xl font-bold text-navy">Cards de recomendação</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Cards em formato de vitrine, com hover destacado e clique para abrir o conteúdo relacionado.
              </p>
            </div>
          </div>

          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="py-2">
              {recommendedCards.map((card) => {
                const targetHref = card.requiresAuth && !user ? card.hrefLoggedOut : card.hrefLoggedIn

                return (
                  <CarouselItem key={card.id} className="md:basis-1/2 xl:basis-1/3">
                    <Link
                      href={targetHref}
                      className="group block h-full rounded-xl border border-border bg-[#FCFCFC] p-5 transition-all duration-200 hover:border-moss/35 hover:shadow-[0_14px_28px_-16px_rgba(10,90,82,0.55)]"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <span className="rounded-full bg-moss/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-moss">
                          {card.type}
                        </span>
                        {getIcon(card.icon)}
                      </div>

                      <h4 className="text-base font-bold leading-snug text-navy">{card.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.summary}</p>
                      <p className="mt-4 text-sm font-semibold text-foreground">{card.byline}</p>

                      {card.coverUrl && (
                        <div className="mt-4 flex items-center gap-3 rounded-lg border border-border bg-white p-2">
                          <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded-sm border border-border">
                            <Image
                              src={card.coverUrl}
                              alt={`Capa de ${card.title}`}
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">Volume 07 • Publicação mais recente</p>
                        </div>
                      )}

                      <div className="mt-4 flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">{card.footer}</p>
                        <ArrowUpRight className="h-4 w-4 text-moss transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </Link>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            <CarouselPrevious className="-left-2 bg-white text-navy hover:bg-secondary md:-left-4" />
            <CarouselNext className="-right-2 bg-white text-navy hover:bg-secondary md:-right-4" />
          </Carousel>
        </Card>
      </div>
    </section>
  )
}
