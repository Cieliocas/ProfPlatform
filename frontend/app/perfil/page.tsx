"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { UserProfile } from "@/components/profile/user-profile"
import { useAuth } from "@/src/contexts/AuthContext"
import { experienceService } from "@/src/services/experienceService"
import { Loader2 } from "lucide-react"
import { experiences as mockExperiences } from "@/src/lib/mock-data"

export default function ProfilePage() {
  const { user, isLoading: authLoading } = useAuth()
  const [experiences, setExperiences] = useState<any[]>([])
  const [loadingExp, setLoadingExp] = useState(true)

  useEffect(() => {
    if (user) {
      experienceService.fetchExperiences(user.id)
        .then((data: any[]) => {
          if (Array.isArray(data)) {
            // O backend já filtra pelo author_id, mas deixamos proteção extra
            const myExps = data.filter((e: any) => e.author_id === user.id)
            if (myExps.length > 0) {
              setExperiences(myExps)
              return
            }
            const fallback = mockExperiences.filter((exp) => String(exp.author?.id) === String(user.id))
            setExperiences(fallback)
          } else {
            const fallback = mockExperiences.filter((exp) => String(exp.author?.id) === String(user.id))
            setExperiences(fallback)
          }
        })
        .catch((err: any) => {
          console.error("Error fetching experiences:", err)
          const fallback = mockExperiences.filter((exp) => String(exp.author?.id) === String(user.id))
          setExperiences(fallback)
        })
        .finally(() => setLoadingExp(false))
    } else if (!authLoading) {
      setLoadingExp(false)
    }
  }, [user, authLoading])

  if (authLoading || loadingExp) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center bg-background">
          <p className="text-muted-foreground">Você precisa estar logado para ver seu perfil.</p>
        </main>
        <Footer />
      </div>
    )
  }

  const enhancedUser = {
    ...user,
    experienceCount: experiences.length
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <UserProfile author={enhancedUser as any} authorExperiences={experiences} />
      </main>
      <Footer />
    </div>
  )
}
