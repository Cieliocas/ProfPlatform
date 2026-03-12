"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ExperienceCard } from "@/components/experience-card"
import { Button } from "@/components/ui/button"
import { experienceService } from "@/src/services/experienceService"
import { experiences as mockExperiences } from "@/src/lib/mock-data"
import { useAuth } from "@/src/contexts/AuthContext"

export default function MinhasSDIsPage() {
  const { user } = useAuth()
  const [experiences, setExperiences] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.id) {
      setExperiences([])
      setLoading(false)
      return
    }

    experienceService.fetchExperiences(user.id)
      .then((data: any[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setExperiences(data)
        } else {
          const fallback = mockExperiences.filter((exp) => exp.author?.id === String(user.id))
          setExperiences(fallback.length > 0 ? fallback : mockExperiences.slice(0, 2))
        }
      })
      .catch((err: any) => {
        console.error(err)
        const fallback = mockExperiences.filter((exp) => exp.author?.id === String(user.id))
        setExperiences(fallback.length > 0 ? fallback : mockExperiences.slice(0, 2))
      })
      .finally(() => setLoading(false))
  }, [user?.id])

  const countLabel = useMemo(() => experiences.length, [experiences.length])

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-navy">Minhas Sequências Didáticas</h1>
              <p className="text-sm text-muted-foreground">{countLabel} publicações</p>
            </div>
            <Button className="bg-mustard text-navy hover:bg-mustard/90 font-semibold" asChild>
              <Link href="/experiencia/nova">
                <Plus className="mr-2 h-4 w-4" />
                Nova Sequência Didática +
              </Link>
            </Button>
          </div>

          <div className="mt-6">
            {loading ? (
              <div className="py-20 text-center text-muted-foreground">Carregando suas SDIs...</div>
            ) : experiences.length > 0 ? (
              <div className="space-y-6">
                {experiences.map((exp: any) => (
                  <ExperienceCard key={exp.id} experience={exp} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center border-2 border-dashed border-border rounded-xl bg-white">
                <p className="text-lg font-medium text-navy">Você ainda não publicou SDIs</p>
                <p className="text-muted-foreground mt-1">Crie sua primeira sequência didática para aparecer aqui.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
