import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { UserProfile } from "@/components/profile/user-profile"
import { authors, experiences } from "@/lib/mock-data"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function UserProfilePage({ params }: PageProps) {
  const { id } = await params
  const author = authors.find((a) => a.id === id)

  if (!author) {
    notFound()
  }

  const userExperiences = experiences.filter((e) => e.author.id === author.id)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <UserProfile author={author} authorExperiences={userExperiences} />
      </main>
      <Footer />
    </div>
  )
}
