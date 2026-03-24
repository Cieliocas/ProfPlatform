"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Bookmark } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ExperienceCard } from "@/components/experience-card"
import { Button } from "@/components/ui/button"
import { experiences as mockExperiences } from "@/src/lib/mock-data"
import { experienceService } from "@/src/services/experienceService"
import { getSavedExperienceIds, savedExperiencesStorageEvent } from "@/src/lib/saved-experiences"
import { PageLoader } from "@/components/ui/page-loader"

export default function SalvosPage() {
  const [allExperiences, setAllExperiences] = useState<any[]>([])
  const [savedIds, setSavedIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function loadSavedPageData() {
      try {
        const apiExperiences = await experienceService.fetchExperiences()
        if (!active) return

        if (Array.isArray(apiExperiences) && apiExperiences.length > 0) {
          const byTitle = new Map<string, any>()
          apiExperiences.forEach((exp: any) => {
            const key = String(exp.title || "").trim().toLowerCase()
            byTitle.set(key, exp)
          })
          mockExperiences.forEach((exp: any) => {
            const key = String(exp.title || "").trim().toLowerCase()
            if (!byTitle.has(key)) byTitle.set(key, exp)
          })
          setAllExperiences(Array.from(byTitle.values()))
        } else {
          setAllExperiences(mockExperiences)
        }
      } catch {
        if (!active) return
        setAllExperiences(mockExperiences)
      } finally {
        if (active) setLoading(false)
      }
    }

    function syncSavedIds() {
      setSavedIds(getSavedExperienceIds())
    }

    loadSavedPageData()
    syncSavedIds()
    window.addEventListener(savedExperiencesStorageEvent, syncSavedIds)
    window.addEventListener("storage", syncSavedIds)

    return () => {
      active = false
      window.removeEventListener(savedExperiencesStorageEvent, syncSavedIds)
      window.removeEventListener("storage", syncSavedIds)
    }
  }, [])

  const savedExperiences = useMemo(() => {
    if (savedIds.length === 0) return []
    const byId = new Map(allExperiences.map((exp: any) => [String(exp.id), exp]))
    return savedIds
      .map((id) => byId.get(String(id)))
      .filter(Boolean)
  }, [allExperiences, savedIds])

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-navy">SDIs Salvas</h1>
              <p className="text-sm text-muted-foreground">Coleção de sequências didáticas favoritas</p>
            </div>
            <Button variant="outline" className="border-border" asChild>
              <Link href="/dashboard">
                <Bookmark className="mr-2 h-4 w-4" />
                Explorar SDIs
              </Link>
            </Button>
          </div>

          <div className="mt-6">
            {loading ? (
              <PageLoader label="Carregando itens salvos..." />
            ) : savedExperiences.length > 0 ? (
              <div className="space-y-6">
                {savedExperiences.map((exp: any) => (
                  <ExperienceCard key={exp.id} experience={exp} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center border-2 border-dashed border-border rounded-xl bg-white">
                <p className="text-lg font-medium text-navy">Nenhuma SDI salva ainda</p>
                <p className="text-muted-foreground mt-1">Use o feed para salvar suas favoritas.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
