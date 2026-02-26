"use client"
import { useState } from "react"

import Link from "next/link"
import { ThumbsUp, Bookmark, MessageCircle, Trash2, FileType, FileText, FileLineChart, Image as ImageIcon, Link2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
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
import type { Experience } from "@/lib/mock-data"

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

  // O backend novo retorna author_id, o mock antigo retornava author.id
  const authorId = experience.author_id || experience.author?.id
  const isOwner = user?.id === authorId
  const authorName = experience.author?.name || "Usuário do Sistema"

  const [isDeleting, setIsDeleting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      if (typeof experience.id === 'string' || typeof experience.id === 'number') {
        // Conversão de tipo segura porque o mock usa string e backend vai usar Int
        await experienceService.deleteExperience(Number(experience.id))
      }
      toast.success("Experiência deletada com sucesso.")
      // Recarregar a página ou notificar callback no frontend verdadeiro
      window.location.reload()
    } catch (e) {
      toast.error("Erro ao deletar a experiência")
    } finally {
      setIsDeleting(false)
      setIsDialogOpen(false)
    }
  }

  return (
    <Card className="group border-border bg-card transition-all hover:shadow-lg hover:-translate-y-0.5">
      <CardContent className="flex flex-col gap-4 p-6">
        {/* Author row */}
        <div className="flex items-center gap-3">
          <PublicProfileDialog authorId={authorId} authorName={authorName}>
            <div className="flex items-center gap-3 cursor-pointer group/author">
              <Avatar className="h-10 w-10 border-2 border-moss/20 group-hover/author:border-moss/50 transition-colors">
                <AvatarFallback className="bg-moss/10 text-xs font-semibold text-moss">
                  {getInitials(authorName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground group-hover/author:text-navy transition-colors">
                  {authorName}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-mustard font-medium">
                    {experience.classification}
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">
                    {experience.discipline}
                  </span>
                </div>
              </div>
            </div>
          </PublicProfileDialog>
        </div>

        {/* Title and context */}
        <div>
          <Link href={`/experiencia/${experience.id}`}>
            <h3 className="text-lg font-bold leading-snug text-foreground group-hover:text-navy transition-colors">
              {experience.title}
            </h3>
          </Link>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
            {experience.content}
          </p>
        </div>

        {/* Attachments Display */}
        {experience.attachments && experience.attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {experience.attachments.map((att: any, idx: number) => {
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
                <DownloadPreviewDialog key={idx} attachment={att}>
                  {renderIcon(att.file_type)}
                  <span className="truncate max-w-[150px] sm:max-w-[200px]">
                    {att.file_type === 'link' ? new URL(att.file_name).hostname : att.file_name}
                  </span>
                </DownloadPreviewDialog>
              )
            })}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {(experience.tags || []).slice(0, 4).map((tag: string) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-secondary text-secondary-foreground text-xs font-medium"
            >
              {tag}
            </Badge>
          ))}
          {(experience.tags || []).length > 4 && (
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground text-xs">
              +{(experience.tags || []).length - 4}
            </Badge>
          )}
        </div>

        {/* Interactions */}
        <div className="flex items-center gap-4 border-t border-border pt-4">
          <button
            type="button"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-mustard"
            aria-label={`${experience.upvotes || 0} aprovacoes`}
          >
            <ThumbsUp className="h-4 w-4" />
            <span className="font-medium">{experience.upvotes || 0}</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-moss"
            aria-label={`${experience.savedCount || 0} vezes salva`}
          >
            <Bookmark className="h-4 w-4" />
            <span className="font-medium">{experience.savedCount || 0}</span>
          </button>
          <Link
            href={`/experiencia/${experience.id}`}
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-navy"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="font-medium">{experience.commentsCount || 0}</span>
          </Link>
          <span className="ml-auto flex items-center gap-4 text-xs text-muted-foreground">
            {isOwner && (
              <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogTrigger asChild>
                  <button
                    type="button"
                    className="text-destructive hover:text-destructive/80 transition-colors"
                    aria-label="Deletar publicação"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza que deseja deletar?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação removerá sua experiência compartilhada para sempre de nossa plataforma.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={(e) => { e.preventDefault(); handleDelete(); }}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Deletando..." : "Sim, deletar"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            {new Date(experience.created_at || experience.createdAt || new Date()).toLocaleDateString("pt-BR", {
              day: "numeric",
              month: "short",
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
