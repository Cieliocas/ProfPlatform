import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ExperienceDetail } from "@/components/experience/experience-detail"
import { experiences } from "@/lib/mock-data"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ExperienceDetailPage({ params }: PageProps) {
  const { id } = await params
  const experience = experiences.find((e) => e.id === id)

  if (!experience) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <ExperienceDetail experience={experience} />
      </main>
      <Footer />
    </div>
  )
}
