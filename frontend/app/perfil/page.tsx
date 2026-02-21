import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { UserProfile } from "@/components/profile/user-profile"
import { authors, experiences } from "@/lib/mock-data"

export default function ProfilePage() {
  // Default to first author as the "logged in" user
  const currentUser = authors[0]
  const userExperiences = experiences.filter(
    (e) => e.author.id === currentUser.id
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <UserProfile author={currentUser} authorExperiences={userExperiences} />
      </main>
      <Footer />
    </div>
  )
}
