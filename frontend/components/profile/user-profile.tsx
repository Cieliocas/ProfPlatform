"use client"

import { useState } from "react"
import { GraduationCap, BookOpen, Bookmark, Settings, MapPin } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExperienceCard } from "@/components/experience-card"
import type { Author, Experience } from "@/lib/mock-data"

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

interface UserProfileProps {
  author: Author
  authorExperiences: Experience[]
}

export function UserProfile({ author, authorExperiences }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState("publicadas")

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 lg:px-8">
      {/* Profile header */}
      <Card className="mb-8 border-border bg-card overflow-hidden">
        <div className="h-24 bg-primary" />
        <CardContent className="relative px-6 pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
            <Avatar className="-mt-12 h-24 w-24 border-4 border-card shadow-md">
              <AvatarFallback className="bg-moss/15 text-2xl font-bold text-moss">
                {getInitials(author.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {author.name}
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Brasil
                </span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="self-start sm:self-auto">
              <Settings className="mr-2 h-4 w-4" />
              Editar Perfil
            </Button>
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {author.bio}
          </p>

          {/* Stats */}
          <div className="mt-6 flex gap-8">
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-foreground">
                {author.experienceCount}
              </span>
              <span className="text-xs text-muted-foreground">Publicacoes</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-foreground">
                {authorExperiences.reduce((sum, e) => sum + e.upvotes, 0)}
              </span>
              <span className="text-xs text-muted-foreground">Aprovacoes</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-foreground">
                {authorExperiences.reduce((sum, e) => sum + e.savedCount, 0)}
              </span>
              <span className="text-xs text-muted-foreground">Salvamentos</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 bg-secondary">
          <TabsTrigger value="publicadas" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Minhas Publicacoes
          </TabsTrigger>
          <TabsTrigger value="salvas" className="gap-2">
            <Bookmark className="h-4 w-4" />
            Salvas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="publicadas">
          {authorExperiences.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {authorExperiences.map((exp) => (
                <ExperienceCard key={exp.id} experience={exp} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16 text-center">
              <BookOpen className="mb-4 h-10 w-10 text-muted-foreground" />
              <p className="text-lg font-medium text-foreground">
                Nenhuma publicacao ainda
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Compartilhe sua primeira experiencia pedagogica!
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="salvas">
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16 text-center">
            <Bookmark className="mb-4 h-10 w-10 text-muted-foreground" />
            <p className="text-lg font-medium text-foreground">
              Nenhuma experiencia salva
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Explore o feed e salve praticas que voce quer experimentar.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
