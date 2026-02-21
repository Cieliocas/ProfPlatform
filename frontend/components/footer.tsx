import Link from "next/link"
import { BookOpen } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-mustard">
                <BookOpen className="h-5 w-5 text-navy" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Vivencia
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-primary-foreground/70">
              Uma plataforma colaborativa para professores compartilharem e
              descobrirem praticas pedagogicas inovadoras.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/50">
              Plataforma
            </h3>
            <nav className="flex flex-col gap-2" aria-label="Links do rodape">
              <Link href="/dashboard" className="text-sm text-primary-foreground/70 transition-colors hover:text-mustard">
                Explorar Experiencias
              </Link>
              <Link href="/experiencia/nova" className="text-sm text-primary-foreground/70 transition-colors hover:text-mustard">
                Compartilhar Pratica
              </Link>
              <Link href="/perfil" className="text-sm text-primary-foreground/70 transition-colors hover:text-mustard">
                Meu Perfil
              </Link>
            </nav>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/50">
              Sobre
            </h3>
            <nav className="flex flex-col gap-2">
              <Link href="#" className="text-sm text-primary-foreground/70 transition-colors hover:text-mustard">
                O Projeto
              </Link>
              <Link href="#" className="text-sm text-primary-foreground/70 transition-colors hover:text-mustard">
                Termos de Uso
              </Link>
              <Link href="#" className="text-sm text-primary-foreground/70 transition-colors hover:text-mustard">
                Politica de Privacidade
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-10 border-t border-primary-foreground/10 pt-6">
          <p className="text-center text-xs text-primary-foreground/50">
            Vivencia &mdash; Projeto de Mestrado. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
