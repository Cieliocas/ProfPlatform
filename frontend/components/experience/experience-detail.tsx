"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ThumbsUp,
  Bookmark,
  Share2,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  GraduationCap,
  MessageSquare,
  FileType,
  FileText,
  FileLineChart,
  Image as ImageIcon,
  Link2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { DownloadPreviewDialog } from "@/components/experience/download-preview-dialog"


function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

interface ExperienceDetailProps {
  experience: any
}

export function ExperienceDetail({ experience }: ExperienceDetailProps) {
  const [upvoted, setUpvoted] = useState(false)
  const [saved, setSaved] = useState(false)
  const [comment, setComment] = useState("")
  const upvoteCount = experience.upvotes + (upvoted ? 1 : 0)

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
      {/* Back link */}
      <Link
        href="/dashboard"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar ao Feed
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {experience.tags.map((tag: string) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-secondary text-secondary-foreground text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {experience.title}
        </h1>

        {/* Author info */}
        <div className="mt-6 flex items-center gap-4">
          <Avatar className="h-12 w-12 border-2 border-moss/20">
            <AvatarFallback className="bg-moss/10 text-sm font-semibold text-moss">
              {getInitials(experience.author.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <Link
              href={`/perfil/${experience.author.id}`}
              className="font-semibold text-foreground hover:text-navy transition-colors"
            >
              {experience.author.name}
            </Link>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(experience.created_at).toLocaleDateString("pt-BR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action bar */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Button
          variant={upvoted ? "default" : "outline"}
          size="sm"
          onClick={() => setUpvoted(!upvoted)}
          className={
            upvoted
              ? "bg-mustard text-navy hover:bg-mustard/90"
              : "border-border"
          }
        >
          <ThumbsUp className="mr-2 h-4 w-4" />
          {upvoted ? "Apliquei e deu certo!" : "Apliquei e deu certo!"}
          <span className="ml-1.5 font-bold">{upvoteCount}</span>
        </Button>
        <Button
          variant={saved ? "default" : "outline"}
          size="sm"
          onClick={() => setSaved(!saved)}
          className={
            saved
              ? "bg-moss text-warm-white hover:bg-moss/90"
              : "border-border"
          }
        >
          <Bookmark className="mr-2 h-4 w-4" />
          {saved ? "Salvo" : "Salvar"}
        </Button>
        <Button variant="outline" size="sm" className="border-border">
          <Share2 className="mr-2 h-4 w-4" />
          Compartilhar
        </Button>
      </div>

      <Separator className="mb-8" />

      {/* Content sections */}
      <div className="flex flex-col gap-8">
        {/* Conteúdo Principal */}
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="mb-3 flex items-center gap-2 text-navy">
              <MessageSquare className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Conteudo da Pratica</h2>
            </div>
            <div className="whitespace-pre-wrap leading-relaxed text-muted-foreground">
              {experience.content}
            </div>

            {/* Attachments Section */}
            {experience.attachments && experience.attachments.length > 0 && (
              <div className="mt-6 pt-4 border-t border-border">
                <div className="mb-3 flex items-center gap-2 text-navy">
                  <span className="text-sm font-semibold">Anexos e Materiais</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {experience.attachments.map((att: any, idx: number) => {
                    const renderIcon = (type: string) => {
                      switch (type) {
                        case "pdf": return <FileType className="h-4 w-4 text-destructive" />
                        case "doc":
                        case "docx": return <FileText className="h-4 w-4 text-blue-500" />
                        case "xls":
                        case "xlsx": return <FileLineChart className="h-4 w-4 text-green-600" />
                        case "image":
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
              </div>
            )}
          </CardContent>
        </Card>

        {/* Comments section */}
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
            <MessageSquare className="h-5 w-5 text-navy" />
            Comentarios
          </h2>
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground py-8">
                A sessao de comentarios estara disponivel em breve.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
