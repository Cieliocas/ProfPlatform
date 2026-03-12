"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { GraduationCap, BookOpen, Bookmark, Settings, MapPin, Trash2 } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { authService } from "@/src/services/authService"
import { ExperienceCard } from "@/components/experience-card"
import type { Author, Experience } from "@/src/lib/mock-data"
import { EditProfileDialog } from "./edit-profile-dialog"
import { useAuth } from "@/src/contexts/AuthContext"

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
  const router = useRouter()
  const { user: currentUser } = useAuth()
  const [activeTab, setActiveTab] = useState("publicadas")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [password, setPassword] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  const isOwner = String(currentUser?.id) === String(author.id)

  const handleDeleteAccount = async () => {
    if (!password) {
      toast.error("Por favor, digite sua senha para confirmar.")
      return
    }

    setIsDeleting(true)
    try {
      await authService.deleteAccount(password)
      toast.success("Sua conta foi excluída com sucesso.")
      // Redirecionar para home, deslogar o contexto etc...
      window.location.href = "/" // Refresh forçando a limpar estados
    } catch (error: any) {
      toast.error(
        error.response?.data?.detail || "Erro ao deletar conta. Verifique sua senha."
      )
    } finally {
      setIsDeleting(false)
      setIsDeleteDialogOpen(false)
      setPassword("")
    }
  }

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
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">

                {(author as any).location_city && (author as any).location_state && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {(author as any).location_city}, {(author as any).location_state} - {(author as any).location_country}
                  </span>
                )}

                {(author as any).graduation_level && (
                  <span className="flex items-center gap-1">
                    <GraduationCap className="h-4 w-4" />
                    {(author as any).graduation_level}
                  </span>
                )}

                {(author as any).workplace && (
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {(author as any).workplace}
                  </span>
                )}

              </div>

              {((author as any).instagram_link || (author as any).email_link || (author as any).custom_link) && (
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                  {(author as any).instagram_link && (
                    <a href={`https://instagram.com/${(author as any).instagram_link.replace('@', '')}`} target="_blank" className="text-mustard hover:underline font-medium">
                      Instagram
                    </a>
                  )}
                  {(author as any).custom_link && (
                    <a href={(author as any).custom_link} target="_blank" className="text-mustard hover:underline font-medium">
                      Site
                    </a>
                  )}
                  {(author as any).email_link && (
                    <a href={`mailto:${(author as any).email_link}`} className="text-mustard hover:underline font-medium">
                      E-mail
                    </a>
                  )}
                </div>
              )}

            </div>
            {isOwner && (
              <EditProfileDialog
                user={currentUser!}
                onSuccess={() => window.location.reload()}
              />
            )}
          </div>

          {author.bio && (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {author.bio}
            </p>
          )}

          {/* Account Actions */}
          {isOwner && (
            <div className="mt-4 flex gap-4">
              <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" className="mt-2">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Deletar Conta
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser desfeita. Isso excluirá permanentemente sua conta
                      e todas as publicações (sequencias didaticas) associadas a você dos nossos servidores.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="my-4 flex flex-col gap-2">
                    <Label htmlFor="password">Para confirmar, digite sua senha:</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteAccount();
                      }}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      disabled={!password || isDeleting}
                    >
                      {isDeleting ? "Excluindo..." : "Confirmar Exclusão"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}

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
                Compartilhe sua primeira sequencia didatica!
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="salvas">
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16 text-center">
            <Bookmark className="mb-4 h-10 w-10 text-muted-foreground" />
            <p className="text-lg font-medium text-foreground">
              Nenhuma sequencia didatica salva
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Explore o feed e salve sequencias que voce quer experimentar.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
