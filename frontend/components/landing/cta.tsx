import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-16 text-center lg:px-16">
          <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-mustard/10" aria-hidden="true" />
          <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-moss/10" aria-hidden="true" />

          <div className="relative">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
              Pronto para transformar sua pratica?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-lg leading-relaxed text-primary-foreground/70">
              Junte-se a centenas de professores que ja estao compartilhando e
              descobrindo experiencias pedagogicas incriveis.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-mustard text-navy hover:bg-mustard/90 font-semibold text-base px-8"
                asChild
              >
                <Link href="/cadastro">
                  Criar Minha Conta
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base"
                asChild
              >
                <Link href="/dashboard">Ver Experiencias</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
