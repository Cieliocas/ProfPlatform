"use client"
import { useState } from "react"

import Link from "next/link"
import { ThumbsUp, Bookmark, Trash2, FileType, FileText, FileLineChart, Image as ImageIcon, Link2, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { useAuth } from "@/src/contexts/AuthContext"
import { experienceService } from "@/src/services/experienceService"
import { interconnectOptions } from "@/src/lib/mock-data"
import { removeDemoPost } from "@/src/lib/demo-posts"

import { PublicProfileDialog } from "./profile/public-profile-dialog"
import { DownloadPreviewDialog } from "./experience/download-preview-dialog"

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

export function ExperienceCard({ experience }: { experience: any }) {
  const { user } = useAuth()

  const authorId = experience.author_id || experience.author?.id
  const isOwner = user?.id === authorId
  const authorName = experience.author?.name || "Usuário do Sistema"
  const authorAvatarUrl = experience.author?.avatarUrl || experience.author?.avatar_url || ""

  const [isDeleting, setIsDeleting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const rawId = experience.id
      const isDemoPost = typeof rawId === "string" && rawId.startsWith("demo-")

      if (isDemoPost) {
        removeDemoPost(rawId)
      } else {
        const numericId = Number(rawId)
        if (!Number.isFinite(numericId)) {
          throw new Error("ID de publicação inválido para exclusão")
        }
        await experienceService.deleteExperience(numericId)
      }

      toast.success("Sequência didática deletada com sucesso.")
      window.location.reload()
    } catch (e) {
      toast.error("Erro ao deletar a experiência")
    } finally {
      setIsDeleting(false)
      setIsDialogOpen(false)
    }
  }

  // Derived mock properties for the new SDI concept
  const expTags = (experience.tags || []) as string[]
  const connectionTag = expTags.find((tag) => interconnectOptions.includes(tag))
  const displayTags = expTags.filter((tag) => tag !== connectionTag).slice(0, 3)

  const displayTitle = experience.title

  const savedCountBase = experience.savedCount ?? experience.saved_count ?? 0
  const appliedCountBase = experience.appliedCount ?? experience.applied_count ?? experience.upvotes ?? 0
  const savedCount = savedCountBase + (saved ? 1 : 0)
  const appliedCount = appliedCountBase + (liked ? 1 : 0)

  const steps = Array.isArray(experience.steps) && experience.steps.length > 0
    ? experience.steps
    : ["Problematizacao", "Hipotese", "Coleta de Dados", "Conclusao"]

  return (
    <Card className="group border-border bg-card transition-all hover:shadow-lg hover:-translate-y-0.5 relative overflow-hidden">
      {/* Accent Top Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-moss to-mustard" />
      <CardContent className="flex flex-col p-6 h-full">
        
        {/* Top Tags & Author */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-moss hover:bg-moss/90 text-white font-bold tracking-wider text-[10px] uppercase">
              Biologia
            </Badge>
            {connectionTag && (
              <Badge variant="outline" className="text-muted-foreground border-border text-[10px] uppercase font-bold bg-background">
                + {connectionTag}
              </Badge>
            )}
          </div>
          <PublicProfileDialog authorId={authorId} authorName={authorName} authorAvatarUrl={authorAvatarUrl}>
            <div className="flex items-center gap-2 cursor-pointer">
              <Avatar className="h-8 w-8 border-2 border-moss/20 hover:border-moss/50 transition-colors">
                <AvatarImage src={authorAvatarUrl} alt={authorName} />
                <AvatarFallback className="bg-moss/10 text-xs font-semibold text-moss">
                  {getInitials(authorName)}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs font-semibold text-muted-foreground">{authorName}</span>
            </div>
          </PublicProfileDialog>
        </div>

        {/* Guiding Question */}
        <div className="mb-6">
          <Link href={`/experiencia/${experience.id}`}>
            <h3 className="text-xl md:text-2xl font-bold leading-tight text-navy group-hover:text-moss transition-colors italic">
              {displayTitle}
            </h3>
          </Link>
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {experience.content}
          </p>
          {displayTags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {displayTags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-secondary text-secondary-foreground text-[10px] uppercase font-semibold">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Scientific Stepper */}
        <div className="mb-8 mt-2 relative px-2">
          <div className="absolute h-[2px] bg-border w-[calc(100%-1rem)] top-1.5 left-2 z-0"></div>
          <div className="flex items-start gap-5 overflow-x-auto pb-1 relative z-10">
            {steps.map((step: any, i: number) => {
              const stepTitle = typeof step === "string" ? step : step?.title || "Etapa"
              return (
                <div key={`step-${i}`} className="flex flex-col items-center gap-2 min-w-[90px]">
                  <div className={`w-3.5 h-3.5 rounded-full border-2 border-background shadow-sm ${i === 0 ? 'bg-mustard' : 'bg-navy'}`}></div>
                  <span className={`text-[9px] font-bold uppercase tracking-widest text-center ${i === 0 ? 'text-mustard' : 'text-navy'}`}>
                    {stepTitle}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Attachments Display */}
        {experience.attachments && experience.attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {experience.attachments.map((att: any, idx: number) => {
              const normalized = typeof att === "string"
                ? { file_name: att, file_type: "link", file_url: att }
                : att

              const renderIcon = (type: string) => {
                switch (type) {
                  case "pdf": return <FileType className="h-4 w-4 text-destructive" />
                  case "doc":
                  case "docx": return <FileText className="h-4 w-4 text-blue-500" />
                  case "xls":
                  case "xlsx": return <FileLineChart className="h-4 w-4 text-green-600" />
                  case "png":
                  case "jpg":
                  case "jpeg":
                  case "webp": return <ImageIcon className="h-4 w-4 text-purple-500" />
                  case "link": return <Link2 className="h-4 w-4 text-navy" />
                  default: return <FileText className="h-4 w-4 text-muted-foreground" />
                }
              }

              return (
                <DownloadPreviewDialog key={idx} attachment={normalized}>
                  {renderIcon(normalized.file_type)}
                  <span className="truncate max-w-[150px] sm:max-w-[200px]">
                    {normalized.file_type === 'link'
                      ? (() => {
                        try { return new URL(normalized.file_name).hostname }
                        catch (e) { return normalized.file_name }
                      })()
                      : normalized.file_name}
                  </span>
                </DownloadPreviewDialog>
              )
            })}
          </div>
        )}

        {/* Interactions & Metadata Footer */}
        <div className="flex flex-wrap items-center gap-4 mt-auto pt-4 border-t border-border">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-semibold">2 - 4 Aulas</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="font-mono bg-secondary px-1.5 py-0.5 rounded text-[10px]">EM13CNT102</span>
          </div>
          
          <div className="ml-auto flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSaved((prev) => !prev)}
              className={`flex items-center gap-1 text-xs ${saved ? "text-moss" : "text-muted-foreground"} hover:text-moss`}
            >
              <Bookmark className="h-3.5 w-3.5" />
              <span className="font-semibold">{savedCount}</span>
              <span>salvaram</span>
            </button>
            <button
              type="button"
              onClick={() => setLiked((prev) => !prev)}
              className={`flex items-center gap-1 text-xs ${liked ? "text-mustard" : "text-muted-foreground"} hover:text-mustard`}
            >
              <ThumbsUp className="h-3.5 w-3.5" />
              <span className="font-semibold">{appliedCount}</span>
              <span>aplicaram</span>
            </button>
            {isOwner && (
              <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogTrigger asChild>
                  <button type="button" className="text-destructive hover:text-destructive/80 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                   <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza que deseja deletar?</AlertDialogTitle>
                    <AlertDialogDescription>Esta ação removerá permanentemente a sua investigação.</AlertDialogDescription>
                   </AlertDialogHeader>
                   <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                     <AlertDialogAction onClick={(e) => { e.preventDefault(); handleDelete(); }} className="bg-destructive text-destructive-foreground hover:bg-destructive/90" disabled={isDeleting}>
                      {isDeleting ? "Deletando..." : "Sim, deletar"}
                     </AlertDialogAction>
                   </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
             )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
