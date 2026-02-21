import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { NewExperienceForm } from "@/components/experience/new-experience-form"

export default function NewExperiencePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <NewExperienceForm />
      </main>
      <Footer />
    </div>
  )
}
