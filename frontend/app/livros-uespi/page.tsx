import Image from "next/image"
import Link from "next/link"
import { BookOpen, Download, ExternalLink } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const books = [
  {
    id: "vol07",
    title: "Sequências Didáticas para o Ensino Médio",
    subtitle: "Metodologias Ativas - Volume 07",
    fileName: "sequenciaVol07.pdf",
    pdfUrl: "/uespi-books/sequenciaVol07.pdf",
    coverUrl: "/uespi-books/covers/sequenciaVol07.pdf.png",
    officialUrl: "https://editora.uespi.br/index.php/editora/catalog/book/296",
    year: "2026",
  },
  {
    id: "bonus",
    title: "Epigenética e Doenças Crônicas Não Transmissíveis",
    subtitle: "Sequências didáticas para o Ensino Médio",
    fileName: "sequenciaBonus.pdf",
    pdfUrl: "/uespi-books/sequenciaBonus.pdf",
    coverUrl: "/uespi-books/covers/sequenciaBonus.pdf.png",
    officialUrl: "https://editora.uespi.br/index.php/editora/catalog/book/233",
    year: "2025",
  },
  {
    id: "vol06",
    title: "Sequências Didáticas para o Ensino Médio",
    subtitle: "Metodologias Ativas - Volume 06",
    fileName: "sequenciaVol06.pdf",
    pdfUrl: "/uespi-books/sequenciaVol06.pdf",
    coverUrl: "/uespi-books/covers/sequenciaVol06.pdf.png",
    officialUrl: "https://editora.uespi.br/index.php/editora/catalog/book/181",
    year: "2024",
  },
  {
    id: "vol05",
    title: "Sequências Didáticas para o Ensino Médio",
    subtitle: "Metodologias Ativas - Volume 05",
    fileName: "sequenciaVol05.pdf",
    pdfUrl: "/uespi-books/sequenciaVol05.pdf",
    coverUrl: "/uespi-books/covers/sequenciaVol05.pdf.png",
    officialUrl: "https://editora.uespi.br/index.php/editora/catalog/book/180",
    year: "2024",
  },
]

export default function LivrosUespiPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-1">
        <section className="bg-navy px-4 py-14 shadow-inner">
          <div className="mx-auto max-w-6xl text-center">
            <p className="mb-3 inline-flex items-center rounded-full border border-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-warm-white/90">
              Acervo UESPI
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Livros de <span className="text-mustard">Sequências Didáticas</span>
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-sm text-warm-white/80 sm:text-base">
              Espaço dedicado a disponibilizar publicações da UESPI sobre Sequências Didáticas e Metodologias Ativas para o Ensino Médio em Biologia.
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-10 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {books.map((book) => (
              <Card key={book.id} className="overflow-hidden rounded-2xl border-border bg-white py-0 shadow-sm">
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="relative aspect-[3/4] w-full bg-secondary text-left">
                      <Image
                        src={book.coverUrl}
                        alt={`Capa do livro ${book.title}`}
                        fill
                        className="object-cover transition-transform duration-200 hover:scale-[1.02]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                        priority={book.id === "vol07"}
                      />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>{book.title}</DialogTitle>
                      <DialogDescription>
                        {book.subtitle} • {book.year}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-lg border">
                      <Image
                        src={book.coverUrl}
                        alt={`Preview da capa do livro ${book.title}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 90vw, 480px"
                      />
                    </div>
                  </DialogContent>
                </Dialog>

                <CardHeader className="px-4 pt-4 pb-0">
                  <p className="text-xs font-semibold uppercase tracking-widest text-moss">Edição {book.year}</p>
                  <CardTitle className="text-base leading-tight text-navy">
                    {book.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{book.subtitle}</p>
                </CardHeader>

                <CardContent className="px-4 pt-3 pb-0">
                  <p className="flex items-center gap-2 text-xs text-muted-foreground">
                    <BookOpen className="h-4 w-4" />
                    {book.fileName}
                  </p>
                </CardContent>

                <CardFooter className="flex gap-2 px-4 py-4">
                  <Button asChild className="h-9 flex-1 bg-navy text-warm-white hover:bg-navy/90">
                    <Link href={book.pdfUrl} target="_blank" rel="noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Abrir
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-9 flex-1">
                    <a href={book.pdfUrl} download>
                      <Download className="mr-2 h-4 w-4" />
                      Baixar
                    </a>
                  </Button>
                </CardFooter>
                <CardFooter className="px-4 pt-0 pb-4">
                  <Button asChild variant="ghost" className="h-9 w-full text-navy hover:bg-secondary">
                    <Link href={book.officialUrl} target="_blank" rel="noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Link Oficial UESPI
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
