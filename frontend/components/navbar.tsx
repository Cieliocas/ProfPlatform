"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, LogIn, LogOut, Loader2, ChevronDown, User, Bookmark, LibraryBig, Compass } from "lucide-react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/src/contexts/AuthContext"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const primaryLinks = [
  { href: "/dashboard", label: "Explorar" },
  { href: "/livros-uespi", label: "UESPI" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, logout, isLoggingOut } = useAuth()
  const pathname = usePathname()

  const isLinkActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard" || pathname.startsWith("/experiencia/")
    }
    return pathname === href
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo-full.png" alt="Bioativa" width={130} height={40} priority className="object-contain" />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-1 px-6 md:flex" aria-label="Menu principal">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                isLinkActive(link.href)
                  ? "bg-mustard text-navy"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    {user.name.split(" ")[0]}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/perfil" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/minhas-sdis" className="cursor-pointer">
                      <LibraryBig className="mr-2 h-4 w-4" />
                      Minhas SDIs
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/salvos" className="cursor-pointer">
                      <Bookmark className="mr-2 h-4 w-4" />
                      Salvos
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => { void logout() }}
                    disabled={isLoggingOut}
                    className="cursor-pointer"
                  >
                    {isLoggingOut ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogOut className="mr-2 h-4 w-4" />}
                    {isLoggingOut ? "Saindo..." : "Sair"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
                {primaryLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-md px-4 py-3 text-sm font-medium transition-colors ${
                      isLinkActive(link.href)
                        ? "bg-mustard text-navy"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {link.label === "Explorar" ? <Compass className="mr-2 inline h-4 w-4" /> : <LibraryBig className="mr-2 inline h-4 w-4" />}
                    {link.label}
                  </Link>
                ))}
                {user && (
                  <>
                    <Link
                      href="/minhas-sdis"
                      className="rounded-md px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      onClick={() => setOpen(false)}
                    >
                      Minhas SDIs
                    </Link>
                    <Link
                      href="/salvos"
                      className="rounded-md px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      onClick={() => setOpen(false)}
                    >
                      Salvos
                    </Link>
                    <Link
                      href="/perfil"
                      className="rounded-md px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      onClick={() => setOpen(false)}
                    >
                      Perfil
                    </Link>
                  </>
                )}
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
