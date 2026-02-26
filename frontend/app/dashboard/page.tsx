"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ExperienceCard } from "@/components/experience-card"
import { Filters } from "@/components/dashboard/filters"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { experienceService } from "@/src/services/experienceService"
import { Loader2 } from "lucide-react"

export default function DashboardPage() {
  const [search, setSearch] = useState("")
  const [selectedClassification, setSelectedClassification] = useState("")
  const [selectedDiscipline, setSelectedDiscipline] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("all") // all, suzianne, uespi

  const [experiences, setExperiences] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    experienceService.fetchExperiences()
      .then((data: any[]) => {
        setExperiences(data)
      })
      .catch((err: any) => console.error("Erro ao buscar experiências reais", err))
      .finally(() => setLoading(false))
  }, [])

  const filteredExperiences = useMemo(() => {
    return experiences.filter((exp) => {
      const matchesSearch =
        !search ||
        exp.title.toLowerCase().includes(search.toLowerCase()) ||
        exp.content.toLowerCase().includes(search.toLowerCase()) ||
        exp.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))

      const matchesClassification =
        !selectedClassification ||
        selectedClassification === "all" ||
        exp.classification === selectedClassification

      const matchesDiscipline =
        !selectedDiscipline ||
        selectedDiscipline === "all" ||
        exp.discipline === selectedDiscipline

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((t) => (exp.tags || []).includes(t))

      const matchesTab =
        activeTab === "all" ||
        (activeTab === "suzianne" && exp.author_id === 1) // Supondo ID 1 para u. mock. Ajuste se for nome

      return matchesSearch && matchesClassification && matchesDiscipline && matchesTags && matchesTab
    })
  }, [search, selectedClassification, selectedDiscipline, selectedTags, activeTab, experiences])

  // Get only Suzianne's experiences for the Featured Carousel
  const featuredExperiences = useMemo(() => {
    return experiences.filter((exp: any) => exp.author_id === 1 || exp.author?.name === "Ana Beatriz Silva")
  }, [experiences])

  function handleTagToggle(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  function handleClearAll() {
    setSearch("")
    setSelectedClassification("")
    setSelectedDiscipline("")
    setSelectedTags([])
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Explorar Experiencias
              </h1>
              <p className="mt-1 text-muted-foreground">
                Descubra praticas pedagogicas compartilhadas por educadores de
                todo o Brasil.
              </p>
            </div>
            <Button className="bg-mustard text-navy hover:bg-mustard/90 font-semibold" asChild>
              <Link href="/experiencia/nova">
                <Plus className="mr-2 h-4 w-4" />
                Nova Experiencia
              </Link>
            </Button>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6 flex gap-4 overflow-x-auto pb-2">
            <Button
              variant={activeTab === "all" ? "default" : "outline"}
              onClick={() => setActiveTab("all")}
              className={activeTab === "all" ? "bg-navy text-white hover:bg-navy/90" : ""}
            >
              Todas as Publicacoes
            </Button>
            <Button
              variant={activeTab === "suzianne" ? "default" : "outline"}
              onClick={() => setActiveTab("suzianne")}
              className={activeTab === "suzianne" ? "bg-navy text-white hover:bg-navy/90" : ""}
            >
              Exemplos (Prof. Suzianne)
            </Button>
            <Button
              variant={activeTab === "uespi" ? "default" : "outline"}
              onClick={() => setActiveTab("uespi")}
              className={activeTab === "uespi" ? "bg-navy text-white hover:bg-navy/90" : ""}
            >
              Livros UESPI
            </Button>
          </div>

          {/* Conditional Rendering based on Tab */}
          {activeTab === "uespi" ? (
            <div className="mt-8 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16 text-center">
              <p className="text-lg font-medium text-foreground">
                Acervo de Livros de Metodologias Ativas Anuais da UESPI
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Em breve, disponibilizaremos aqui os PDFs e materiais oficiais.
              </p>
            </div>
          ) : (
            <>
              {/* Featured Carousel (visible only on 'all' tab) */}
              {activeTab === "all" && featuredExperiences.length > 0 && (
                <div className="mb-12">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold tracking-tight text-foreground">
                        Publicacoes em Destaque
                      </h2>
                      <p className="text-sm text-mustard font-medium mt-1">
                        Inspiracoes da Prof. Suzianne
                      </p>
                    </div>
                  </div>
                  <div className="px-12">
                    <Carousel
                      opts={{
                        align: "start",
                        loop: true,
                      }}
                      className="w-full"
                    >
                      <CarouselContent className="-ml-4">
                        {featuredExperiences.map((exp) => (
                          <CarouselItem key={exp.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                            <div className="p-1 h-full">
                              <ExperienceCard experience={exp} />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  </div>
                </div>
              )}

              {/* Filters */}
              <Filters
                search={search}
                onSearchChange={setSearch}
                selectedClassification={selectedClassification}
                onClassificationChange={setSelectedClassification}
                selectedDiscipline={selectedDiscipline}
                onDisciplineChange={setSelectedDiscipline}
                selectedTags={selectedTags}
                onTagToggle={handleTagToggle}
                onClearAll={handleClearAll}
              />

              {/* Results */}
              <div className="mt-8">
                <p className="mb-4 text-sm text-muted-foreground">
                  {filteredExperiences.length}{" "}
                  {filteredExperiences.length === 1
                    ? "experiencia encontrada"
                    : "experiencias encontradas"}
                </p>
                {filteredExperiences.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredExperiences.map((exp) => (
                      <ExperienceCard key={exp.id} experience={exp} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16 text-center">
                    <p className="text-lg font-medium text-foreground">
                      Nenhuma experiencia encontrada
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Tente ajustar os filtros ou buscar por outros termos.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={handleClearAll}
                    >
                      Limpar Filtros
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
