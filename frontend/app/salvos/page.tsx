"use client"

import { useMemo } from "react"
import Link from "next/link"
import { Bookmark } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ExperienceCard } from "@/components/experience-card"
import { Button } from "@/components/ui/button"
import { experiences as mockExperiences } from "@/src/lib/mock-data"

export default function SalvosPage() {
  const savedExperiences = useMemo(() => {
    return [...mockExperiences].sort((a, b) => (b.savedCount || 0) - (a.savedCount || 0)).slice(0, 6)
  }, [])

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
            {savedExperiences.length > 0 ? (
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
