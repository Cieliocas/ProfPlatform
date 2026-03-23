import Link from "next/link"
import Image from "next/image"
import { BookOpen } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <Image src="/logo-full.png" alt="Bioativa" width={160} height={50} className="brightness-0 invert object-contain" />
            </Link>
            <p className="text-sm leading-relaxed text-primary-foreground/70">
              Uma plataforma colaborativa para professores de Biologia
              compartilharem e descobrirem sequencias didaticas investigativas.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/50">
              Plataforma
            </h3>
            <nav className="flex flex-col gap-2" aria-label="Links do rodape">
              <Link href="/dashboard" className="text-sm text-primary-foreground/70 transition-colors hover:text-mustard">
                Explorar SDIs de Biologia
              </Link>
              <Link href="/livros-uespi" className="text-sm text-primary-foreground/70 transition-colors hover:text-mustard">
                Livros UESPI
              </Link>
              <Link href="/experiencia/nova" className="text-sm text-primary-foreground/70 transition-colors hover:text-mustard">
                Compartilhar SDI
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
            Bioativa - Projeto de Mestrado. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
