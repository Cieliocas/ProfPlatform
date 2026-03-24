"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, TrendingUp, Beaker } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ExperienceCard } from "@/components/experience-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { highSchoolYears, biologyAxes, interconnectOptions, experiences as mockExperiences } from "@/src/lib/mock-data"
import { PageLoader } from "@/components/ui/page-loader"

export default function DashboardPage() {
  const [search, setSearch] = useState("")
  const [selectedYears, setSelectedYears] = useState<string[]>([])
  const [selectedAxes, setSelectedAxes] = useState<string[]>([])
  const [selectedConnection, setSelectedConnection] = useState<string>("all")

  const [experiences] = useState<any[]>(mockExperiences)
  const [loading] = useState(false)

  const normalize = (value: string) =>
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")

  const filteredExperiences = useMemo(() => {
    return experiences.filter((exp) => {
      const query = normalize(search.trim())
      const title = normalize(exp.title || "")
      const content = normalize(exp.content || "")
      const expTags = Array.isArray(exp.tags) ? exp.tags.map((tag: string) => normalize(tag)) : []

      const matchesSearch = !query ||
        title.includes(query) ||
        content.includes(query) ||
        expTags.some((tag) => tag.includes(query))

      const matchesAxis = selectedAxes.length === 0 || selectedAxes.some((axis) => expTags.includes(normalize(axis)))
      const matchesYear = selectedYears.length === 0 || selectedYears.some((year) => expTags.includes(normalize(year)))
      const matchesConnection = selectedConnection === "all" || expTags.includes(normalize(selectedConnection))

      // Filtering is tag-based for MVP; backend does not yet expose explicit fields
      return matchesSearch && matchesAxis && matchesYear && matchesConnection
    })
  }, [search, selectedAxes, selectedYears, selectedConnection, experiences])

  const toggleAxis = (axis: string) => {
    setSelectedAxes(prev => prev.includes(axis) ? prev.filter(a => a !== axis) : [...prev, axis])
  }

  const toggleYear = (year: string) => {
    setSelectedYears(prev => prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year])
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <div className="bg-navy py-14 px-4 shadow-inner">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl mb-4">
              Explorar <span className="text-mustard">Sequências Didáticas</span> Investigativas
            </h1>
            <p className="text-sm sm:text-base text-warm-white/80 mb-8">
              Conectando a Biologia ao método científico no Ensino Médio.
            </p>
            <div className="relative max-w-3xl mx-auto flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
              <Input
                className="pl-12 h-14 bg-white border-0 text-lg rounded-full shadow-lg focus-visible:ring-mustard"
                placeholder="Busque por sequências didáticas, problemas biológicos ou temas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button className="absolute right-2 h-10 rounded-full bg-mustard text-navy hover:bg-mustard/90 font-bold px-6">
                Buscar
              </Button>
            </div>
            <div className="mt-6">
              <Button className="bg-warm-white text-navy hover:bg-warm-white/90 font-semibold" asChild>
                <Link href="/experiencia/nova">
                  Nova Sequência Didática +
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
          <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Séries</span>
                {highSchoolYears.map((year: string) => {
                  const isActive = selectedYears.includes(year)
                  return (
                    <button
                      key={year}
                      type="button"
                      onClick={() => toggleYear(year)}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${isActive ? "bg-mustard text-navy" : "bg-secondary text-secondary-foreground hover:bg-border"}`}
                    >
                      {year}
                    </button>
                  )
                })}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Eixos da Biologia</span>
                {biologyAxes.map((axis: string) => {
                  const isActive = selectedAxes.includes(axis)
                  return (
                    <button
                      key={axis}
                      type="button"
                      onClick={() => toggleAxis(axis)}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${isActive ? "bg-moss text-white" : "bg-secondary text-secondary-foreground hover:bg-border"}`}
                    >
                      {axis}
                    </button>
                  )
                })}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Conexões Interdisciplinares</span>
                <div className="min-w-[220px]">
                  <Select value={selectedConnection} onValueChange={setSelectedConnection}>
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Selecione disciplina..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Apenas Biologia</SelectItem>
                      {interconnectOptions.map((opt: string) => (
                        <SelectItem key={opt} value={opt}>+ {opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-10 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Central Feed: Inquiry Cards */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-xl font-bold text-navy">
                    Sequências Didáticas Investigativas
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {filteredExperiences.length} resultados encontrados
                  </p>
                </div>
              </div>

              {loading ? (
                <PageLoader label="Carregando SDIs..." />
              ) : filteredExperiences.length > 0 ? (
                <div className="space-y-6">
                  {filteredExperiences.map((exp: any) => (
                    <ExperienceCard key={exp.id} experience={exp} />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center border-2 border-dashed border-border rounded-xl bg-white">
                  <p className="text-lg font-medium text-navy">Nenhuma sequência didática encontrada</p>
                  <p className="text-muted-foreground mt-1">Refine seus filtros ou seja o primeiro a criar!</p>
                </div>
              )}
            </div>

            {/* Right Sidebar: Trending */}
            <aside className="lg:col-span-4">
              <div className="bg-white rounded-xl border border-border p-5 shadow-sm sticky top-24">
                <h3 className="font-bold text-navy mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-moss" />
                  Sequências Didáticas em Alta
                </h3>
                <div className="space-y-4">
                  <div className="group cursor-pointer">
                    <p className="text-sm font-semibold text-foreground group-hover:text-moss transition-colors">Microplásticos e Cadeia Alimentar</p>
                    <p className="text-xs text-muted-foreground mt-0.5">14 novas SDIs esta semana</p>
                  </div>
                  <div className="group cursor-pointer">
                    <p className="text-sm font-semibold text-foreground group-hover:text-moss transition-colors">Polinizadores e Mudanças Climáticas</p>
                    <p className="text-xs text-muted-foreground mt-0.5">8 novas SDIs esta semana</p>
                  </div>
                  <div className="group cursor-pointer">
                    <p className="text-sm font-semibold text-foreground group-hover:text-moss transition-colors">Ecossistemas Costeiros</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Top Salvos do Mês</p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-border">
                  <div className="flex flex-col items-center justify-center text-center p-3 bg-moss/5 rounded-lg border border-moss/10">
                    <Beaker className="w-8 h-8 text-moss mb-2" />
                    <p className="text-xs font-semibold text-navy">Laboratório Investigativo</p>
                    <p className="text-[10px] text-muted-foreground mt-1">Conecte sua teoria à prática e compartilhe resultados com a comunidade.</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
