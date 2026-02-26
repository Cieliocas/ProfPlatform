import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ExperienceDetail } from "@/components/experience/experience-detail"

interface PageProps {
  params: Promise<{ id: string }>
}

async function getExperience(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/experiences/${id}`, {
      cache: 'no-store'
    });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    return null;
  }
}

export default async function ExperienceDetailPage({ params }: PageProps) {
  const { id } = await params
  const experience = await getExperience(id);

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
