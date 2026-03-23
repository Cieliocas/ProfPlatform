"use client"

import Link from "next/link"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/src/contexts/AuthContext"

const demoPosts = [
  {
    id: "suzianne-real",
    title: "“QUEM É VOCÊ, BICHO?”",
    subtitle: "Post real da Suzianne",
    image: "/suzianne-demo/Suzianne_Raquel_Valadares_Sales_Sousa_corrigido_e_enviado_2.pdf.png",
  },
  {
    id: "suzianne-demo",
    title: "Abstração visual de sequência didática",
    subtitle: "Demonstração de post",
    image: "/suzianne-demo/post-02.svg",
  },
]

export function SuzianneSpotlight() {
  const { user } = useAuth()
  const postTargetUrl = user ? "/experiencia/real-0" : "/login"

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
              Passe o mouse para destacar. Ao clicar, você acessa o post original (ou a tela de login, se não estiver autenticado).
            </p>
          </div>

          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent>
              {demoPosts.map((post) => (
                <CarouselItem key={post.id} className="md:basis-1/2">
                  <Link
                    href={postTargetUrl}
                    className="group block overflow-hidden rounded-xl border border-border bg-secondary transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="relative aspect-[4/5] w-full">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                    </div>
                    <div className="border-t border-border bg-white px-4 py-3">
                      <p className="text-sm font-semibold text-navy">{post.title}</p>
                      <p className="text-xs text-muted-foreground">{post.subtitle}</p>
                    </div>
                  </Link>
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
