"use client"

import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card } from "@/components/ui/card"

const demoPosts = [
  {
    id: "suzianne-01",
    title: "Investigação sobre biodiversidade urbana",
    image: "/suzianne-demo/post-01.svg",
  },
  {
    id: "suzianne-02",
    title: "Genética aplicada ao cotidiano",
    image: "/suzianne-demo/post-02.svg",
  },
  {
    id: "suzianne-03",
    title: "Ecologia e análise de impacto local",
    image: "/suzianne-demo/post-03.svg",
  },
]

export function SuzianneSpotlight() {
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
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-moss">Demonstração visual</p>
            <h3 className="mt-1 text-2xl font-bold text-navy">Exemplos de posts da Suzianne</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Carrossel ilustrativo para apresentação do acervo. Conteúdo apenas visual.
            </p>
          </div>

          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent>
              {demoPosts.map((post) => (
                <CarouselItem key={post.id} className="md:basis-1/2">
                  <div className="overflow-hidden rounded-xl border border-border bg-secondary">
                    <div className="relative aspect-[4/5] w-full">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                    </div>
                    <div className="border-t border-border bg-white px-4 py-3">
                      <p className="text-sm font-semibold text-navy">{post.title}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-2 bg-white text-navy hover:bg-secondary md:-left-4" />
            <CarouselNext className="-right-2 bg-white text-navy hover:bg-secondary md:-right-4" />
          </Carousel>
        </Card>
      </div>
    </section>
  )
}
