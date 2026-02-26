"use client"

import { useEffect, useState, use } from "react"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { UserProfile } from "@/components/profile/user-profile"
import { authService } from "@/src/services/authService"
import { experienceService } from "@/src/services/experienceService"
import { User } from "@/src/types/auth"
import { Loader2 } from "lucide-react"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function UserProfilePage({ params }: PageProps) {
  const { id } = use(params)
  const [author, setAuthor] = useState<User | null>(null)
  const [userExperiences, setUserExperiences] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [profileData, expsData] = await Promise.all([
          authService.getPublicProfile(id),
          experienceService.fetchExperiences(Number(id))
        ])

        // Contagem calculada para emular backend field virtual
        const enhancedAuthor = {
          ...profileData,
          experienceCount: Array.isArray(expsData) ? expsData.length : 0
        }

        setAuthor(enhancedAuthor)
        setUserExperiences(Array.isArray(expsData) ? expsData : [])
      } catch (error) {
        console.error("Erro ao carregar perfil:", error)
        // Se 404 a API retornará error, notFound não funciona muito bem assíncrono dentro do useEffect Client
        // então lidamos com UI condicional abaixo.
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [id])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!author) {
    return (
      <div className="flex min-h-screen flex-col text-center">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center bg-background">
          <h2 className="text-xl font-bold">Usuário não encontrado</h2>
          <p className="text-muted-foreground mt-2">O perfil que você tentou acessar não existe ou foi excluído.</p>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <UserProfile author={author as any} authorExperiences={userExperiences} />
      </main>
      <Footer />
    </div>
  )
}
