import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Lightbulb, BookOpen } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary py-20 lg:py-32">
      {/* Decorative circles */}
      <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-moss/10" aria-hidden="true" />
      <div className="absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-mustard/10" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-4 py-2 text-sm text-primary-foreground/80">
            <Lightbulb className="h-4 w-4 text-mustard" />
            Plataforma colaborativa para educadores
          </div>

          <h1 className="max-w-4xl text-balance text-4xl font-bold leading-tight tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
            Compartilhe suas experiencias.{" "}
            <span className="text-mustard">Transforme a educacao.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-primary-foreground/70 md:text-xl">
            Um espaco acolhedor onde professores trocam vivencias pedagogicas,
            descobrem praticas inovadoras e constroem juntos uma educacao mais
            criativa e significativa.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-mustard text-navy hover:bg-mustard/90 font-semibold text-base px-8"
              asChild
            >
              <Link href="/cadastro">
                Comece Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8"
              asChild
            >
              <Link href="/dashboard">Explorar Experiencias</Link>
            </Button>
          </div>

          <div className="mt-16 grid w-full max-w-lg grid-cols-3 gap-8">
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-moss/20">
                <Users className="h-6 w-6 text-moss" />
              </div>
              <span className="text-2xl font-bold text-primary-foreground">250+</span>
              <span className="text-xs text-primary-foreground/60">Professores</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mustard/20">
                <BookOpen className="h-6 w-6 text-mustard" />
              </div>
              <span className="text-2xl font-bold text-primary-foreground">480+</span>
              <span className="text-xs text-primary-foreground/60">Experiencias</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-moss/20">
                <Lightbulb className="h-6 w-6 text-moss" />
              </div>
              <span className="text-2xl font-bold text-primary-foreground">1.2k</span>
              <span className="text-xs text-primary-foreground/60">{'Apliquei e deu certo!'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
