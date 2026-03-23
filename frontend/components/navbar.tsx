"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, LogIn, LogOut, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/src/contexts/AuthContext"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"

const navLinks = [
  { href: "/minhas-sdis", label: "Minhas SDIs" },
  { href: "/livros-uespi", label: "Livros UESPI" },
  { href: "/salvos", label: "Salvos" },
  { href: "/perfil", label: "Perfil" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, logout, isLoggingOut } = useAuth()

  const availableLinks = navLinks.filter(link => {
    // Esconde links protegidos se não estiver logado
    if (!user) return false; // Dashboard "Explorar", Compartilhar e Perfil são privados 
    return true;
  })

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo-full.png" alt="Bioativa" width={130} height={40} priority className="object-contain" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Menu principal">
          {availableLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-foreground/80">Olá, {user.name.split(' ')[0]}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => { void logout() }}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogOut className="mr-2 h-4 w-4" />}
                {isLoggingOut ? "Saindo..." : "Sair"}
              </Button>
            </div>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Entrar
                </Link>
              </Button>
              <Button size="sm" className="bg-mustard text-navy hover:bg-mustard/90 font-semibold" asChild>
                <Link href="/cadastro">
                  Criar Conta
                </Link>
              </Button>
            </>
          )}
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Abrir menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetTitle className="sr-only">Menu de navegacao</SheetTitle>
            <div className="flex flex-col gap-6 pt-8">
              <Link href="/" className="flex items-center gap-2.5 pl-1" onClick={() => setOpen(false)}>
                <Image src="/logo-full.png" alt="Bioativa" width={130} height={40} priority className="object-contain" />
              </Link>
              <nav className="flex flex-col gap-1" aria-label="Menu mobile">
                {availableLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-md px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="flex flex-col gap-2 border-t border-border pt-4">
                {user ? (
                  <>
                    <span className="px-4 py-2 text-sm font-medium text-foreground">
                      Conectado como: {user.name}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setOpen(false)
                        void logout()
                      }}
                      disabled={isLoggingOut}
                    >
                      {isLoggingOut ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogOut className="mr-2 h-4 w-4" />}
                      {isLoggingOut ? "Saindo..." : "Sair"}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" asChild>
                      <Link href="/login" onClick={() => setOpen(false)}>
                        <LogIn className="mr-2 h-4 w-4" />
                        Entrar
                      </Link>
                    </Button>
                    <Button className="bg-mustard text-navy hover:bg-mustard/90 font-semibold" asChild>
                      <Link href="/cadastro" onClick={() => setOpen(false)}>
                        Criar Conta
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
