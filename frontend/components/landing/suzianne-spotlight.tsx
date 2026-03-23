"use client"

import Link from "next/link"
import Image from "next/image"
import { BookMarked, GraduationCap, Sparkles, Star } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/src/contexts/AuthContext"

const recommendedCards = [
  {
    id: "suzianne-sdi",
    type: "SDI da Suzianne",
    title: "“QUEM É VOCÊ, BICHO?”",
    summary: "Abstração do post real com foco em investigação, observação de campo e construção de hipóteses no Ensino Médio.",
    byline: "Prof. Suzianne Valadares",
    footer: "Sequência Didática Investigativa",
    hrefLoggedIn: "/experiencia/real-0",
    hrefLoggedOut: "/login",
    requiresAuth: true,
  },
  {
    id: "prof-ref",
    type: "Referência de Professor",
    title: "Luz, Câmera e Ação na Lagoa",
    summary: "Exemplo de SDI de outro professor para ampliar repertório e mostrar diferentes abordagens de problematização em Biologia.",
    byline: "Profa. Samara Oliveira da Silva",
    footer: "Post de referência da comunidade",
    hrefLoggedIn: "/experiencia/real-1",
    hrefLoggedOut: "/login",
    requiresAuth: true,
  },
  {
    id: "uespi-2026",
    type: "Livro UESPI 2026",
    title: "Metodologias Ativas - Volume 07",
    summary: "Publicação mais recente da UESPI para apoiar planejamento de Sequências Didáticas e práticas investigativas.",
    byline: "Editora UESPI",
    footer: "Acervo UESPI",
    hrefLoggedIn: "/livros-uespi",
    hrefLoggedOut: "/livros-uespi",
    requiresAuth: false,
    coverUrl: "/uespi-books/covers/sequenciaVol07.pdf.png",
  },
]

export function SuzianneSpotlight() {
  const { user } = useAuth()

  return (
    <section className="bg-[#F8FAFC] py-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-12 lg:px-8">
        <Card className="lg:col-span-5 overflow-hidden rounded-2xl border-border bg-white p-0 shadow-sm">
          <div className="relative h-[420px] w-full bg-secondary">
            <Image
              src="/suzianne-photo.jpeg"
              alt="Professora Suzianne Valadares"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
          <div className="p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-moss">Idealização do projeto</p>
            <h2 className="mt-2 text-2xl font-bold text-navy">Professora Suzianne Valadares</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Idealizadora da plataforma e mestranda. Este espaço destaca a proposta pedagógica baseada em Sequências Didáticas Investigativas para o Ensino Médio.
            </p>
          </div>
        </Card>

        <Card className="lg:col-span-7 rounded-2xl border-border bg-white p-6 shadow-sm">
          <div className="mb-4 grid gap-4 lg:grid-cols-[180px_1fr]">
            <div className="rounded-xl bg-mustard/90 p-4 text-navy">
              <p className="text-xs font-semibold uppercase tracking-widest">Curadoria</p>
              <p className="mt-2 text-2xl font-bold leading-none">Top 3</p>
              <p className="mt-2 text-sm">Sequências e materiais indicados para inspirar novas práticas.</p>
              <div className="mt-3 flex gap-1 text-navy">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-moss">Conteúdo recomendado pela prof. suzianne</p>
              <h3 className="mt-1 text-2xl font-bold text-navy">Cards de recomendação</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Carrossel em formato de card com destaque por hover. Clique para abrir o conteúdo relacionado.
              </p>
            </div>
          </div>

          <Carousel opts={{ align: "start", loop: true }} className="w-full px-1">
            <CarouselContent>
              {recommendedCards.map((card) => {
                const targetHref = card.requiresAuth && !user ? card.hrefLoggedOut : card.hrefLoggedIn

                return (
                <CarouselItem key={card.id} className="md:basis-1/2 xl:basis-1/3">
                  <Link
                    href={targetHref}
                    className="group block h-full overflow-hidden rounded-xl border border-border bg-[#FBFBFB] transition-all hover:-translate-y-1 hover:border-moss/20 hover:shadow-lg"
                  >
                    <div className="flex h-full flex-col p-5">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="rounded-full bg-moss/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-moss">
                          {card.type}
                        </span>
                        {card.type === "SDI da Suzianne" && <GraduationCap className="h-4 w-4 text-moss" />}
                        {card.type === "Referência de Professor" && <Sparkles className="h-4 w-4 text-moss" />}
                        {card.type === "Livro UESPI 2026" && <BookMarked className="h-4 w-4 text-moss" />}
                      </div>

                      {card.coverUrl && (
                        <div className="relative mb-4 aspect-[3/4] w-full overflow-hidden rounded-lg border border-border bg-secondary">
                          <Image
                            src={card.coverUrl}
                            alt={`Capa de ${card.title}`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                            sizes="(max-width: 1280px) 50vw, 20vw"
                          />
                        </div>
                      )}

                      <h4 className="text-lg font-bold leading-snug text-navy">{card.title}</h4>
                      <p className="mt-2 text-sm text-muted-foreground">{card.summary}</p>
                      <p className="mt-4 text-sm font-semibold text-foreground">{card.byline}</p>
                      <p className="mt-auto pt-4 text-xs text-muted-foreground">{card.footer}</p>
                    </div>
                  </Link>
                </CarouselItem>
              )})}
            </CarouselContent>
            <CarouselPrevious className="-left-2 bg-white text-navy hover:bg-secondary md:-left-4" />
            <CarouselNext className="-right-2 bg-white text-navy hover:bg-secondary md:-right-4" />
          </Carousel>
        </Card>
      </div>
    </section>
  )
}
