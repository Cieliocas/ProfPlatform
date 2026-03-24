"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  ThumbsUp,
  Bookmark,
  Share2,
  ArrowLeft,
  Calendar,
  MessageSquare,
  FileType,
  FileText,
  FileLineChart,
  Image as ImageIcon,
  Link2,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { DownloadPreviewDialog } from "@/components/experience/download-preview-dialog"
import { useAuth } from "@/src/contexts/AuthContext"
import { isExperienceSaved, toggleExperienceSaved } from "@/src/lib/saved-experiences"


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

function ReplyBox({ onReply }: { onReply: (text: string) => void }) {
  const [reply, setReply] = useState("")
  return (
    <div className="flex flex-col gap-2">
      <Textarea
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="Responder como autor da SDI..."
        className="min-h-20 border-border bg-background"
      />
      <div className="flex justify-end">
        <Button
          size="sm"
          className="bg-mustard text-navy hover:bg-mustard/90 font-semibold"
          onClick={() => {
            onReply(reply)
            setReply("")
          }}
          disabled={!reply.trim()}
        >
          Responder
        </Button>
      </div>
    </div>
  )
}

export function ExperienceDetail({ experience }: ExperienceDetailProps) {
  const { user } = useAuth()
  const isAuthorUser = Boolean(user?.id && experience.author?.id && String(user.id) === String(experience.author.id))
  const [upvoted, setUpvoted] = useState(false)
  const [saved, setSaved] = useState(false)
  const [comment, setComment] = useState("")
  const upvoteCount = (experience.upvotes || 0) + (upvoted ? 1 : 0)
  const savedCount = (experience.savedCount || experience.saved_count || 0) + (saved ? 1 : 0)

  useEffect(() => {
    setSaved(isExperienceSaved(experience.id))
  }, [experience.id])

  const initialComments = useMemo(() => {
    if (Array.isArray(experience.comments) && experience.comments.length > 0) {
      return experience.comments
    }
    return []
  }, [experience.comments])

  const [comments, setComments] = useState<any[]>(initialComments)
  const canDeleteByName = (authorName: string) =>
    Boolean(user?.name && authorName && user.name.trim().toLowerCase() === authorName.trim().toLowerCase())

  const steps = Array.isArray(experience.steps) && experience.steps.length > 0
    ? experience.steps
    : [
      { title: "Problematizacao", description: "Contextualize o tema e a questao central." },
      { title: "Hipotese", description: "Registre as hipoteses iniciais da turma." },
      { title: "Coleta de Dados", description: "Planeje e execute a coleta de dados." },
      { title: "Conclusao", description: "Analise resultados e sintetize aprendizagens." },
    ]

  const handleAddComment = () => {
    const trimmed = comment.trim()
    if (!trimmed) return
    const newComment = {
      id: Date.now(),
      authorName: user?.name || "Professor(a) visitante",
      createdAt: new Date().toISOString(),
      text: trimmed
    }
    setComments((prev) => [newComment, ...prev])
    setComment("")
  }

  const handleAddReply = (commentId: number, replyText: string) => {
    const trimmed = replyText.trim()
    if (!trimmed) return
    const authorName = user?.name || experience.author?.name || "Autor da SDI"
    const newReply = {
      id: Date.now(),
      authorName,
      createdAt: new Date().toISOString(),
      text: trimmed
    }
    setComments((prev) => prev.map((c) => (
      c.id === commentId
        ? { ...c, replies: [...(c.replies || []), newReply] }
        : c
    )))
  }

  const handleDeleteComment = (commentId: number) => {
    setComments((prev) => prev.filter((c) => c.id !== commentId))
  }

  const handleDeleteReply = (commentId: number, replyId: number) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? { ...c, replies: (c.replies || []).filter((r: any) => r.id !== replyId) }
          : c
      )
    )
  }

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
          {(experience.tags || []).map((tag: string) => (
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
        <p className="mt-3 text-sm text-muted-foreground">
          Sequência didática investigativa em Biologia
        </p>

        {/* Author info */}
        <div className="mt-6 flex items-center gap-4">
          <Avatar className="h-12 w-12 border-2 border-moss/20">
            <AvatarImage src={experience.author?.avatarUrl || experience.author?.avatar_url || ""} alt={experience.author?.name} />
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
          onClick={() => setSaved(toggleExperienceSaved(experience.id))}
          className={
            saved
              ? "bg-moss text-warm-white hover:bg-moss/90"
              : "border-border"
          }
        >
          <Bookmark className="mr-2 h-4 w-4" />
          {saved ? "Salvo" : "Salvar"}
          <span className="ml-1.5 font-bold">{savedCount}</span>
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
              <h2 className="text-lg font-semibold">Conteudo da Sequência Didática</h2>
            </div>
            <div className="whitespace-pre-wrap leading-relaxed text-muted-foreground">
              {experience.content}
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <h3 className="text-sm font-semibold text-navy mb-3">Etapas da Investigacao</h3>
              <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                {steps.map((step: any, i: number) => (
                  <li key={`step-${i}`} className="flex items-start gap-2">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-mustard text-[10px] font-bold text-navy">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">{typeof step === "string" ? step : step?.title}</p>
                      {typeof step !== "string" && step?.description && (
                        <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Attachments Section */}
            {experience.attachments && experience.attachments.length > 0 && (
              <div className="mt-6 pt-4 border-t border-border">
                <div className="mb-3 flex items-center gap-2 text-navy">
                  <span className="text-sm font-semibold">Anexos e Materiais</span>
                </div>
                <div className="flex flex-wrap gap-2">
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
              </div>
            )}
          </CardContent>
        </Card>

        {/* Comments section */}
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
            <MessageSquare className="h-5 w-5 text-navy" />
            Comentarios de Professores de Biologia
          </h2>
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="mb-6">
                <label htmlFor="comment" className="mb-2 block text-sm font-semibold text-foreground">
                  Deixe sua contribuicao
                </label>
                <Textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Compartilhe observacoes, melhorias ou duvidas sobre a sequencia..."
                  className="min-h-24 border-border bg-background"
                />
                <div className="mt-3 flex justify-end">
                  <Button
                    className="bg-mustard text-navy hover:bg-mustard/90 font-semibold"
                    onClick={handleAddComment}
                    disabled={!comment.trim()}
                  >
                    Publicar comentario
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                {comments.length > 0 ? comments.map((c) => {
                  const isAuthor = c.authorName === experience.author?.name
                  return (
                    <div key={c.id} className="flex gap-3">
                      <Avatar className="h-9 w-9 border-2 border-moss/20">
                        <AvatarFallback className="bg-moss/10 text-xs font-semibold text-moss">
                          {getInitials(c.authorName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-semibold text-foreground">{c.authorName}</span>
                          {isAuthor && (
                            <span className="rounded-full bg-moss/10 px-2 py-0.5 text-[10px] font-semibold text-moss">
                              Autor
                            </span>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {new Date(c.createdAt).toLocaleDateString("pt-BR", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                          {canDeleteByName(c.authorName) && (
                            <button
                              type="button"
                              onClick={() => handleDeleteComment(c.id)}
                              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Excluir
                            </button>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{c.text}</p>

                        {isAuthorUser && (
                          <div className="mt-3">
                            <ReplyBox onReply={(text) => handleAddReply(c.id, text)} />
                          </div>
                        )}

                        {c.replies && c.replies.length > 0 && (
                          <div className="mt-4 space-y-4 border-l border-border pl-4">
                            {c.replies.map((r) => {
                              const replyIsAuthor = r.authorName === experience.author?.name
                              return (
                                <div key={r.id} className="flex gap-3">
                                  <Avatar className="h-8 w-8 border-2 border-moss/20">
                                    <AvatarFallback className="bg-moss/10 text-[10px] font-semibold text-moss">
                                      {getInitials(r.authorName)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span className="text-xs font-semibold text-foreground">{r.authorName}</span>
                                      {replyIsAuthor && (
                                        <span className="rounded-full bg-moss/10 px-2 py-0.5 text-[10px] font-semibold text-moss">
                                          Autor
                                        </span>
                                      )}
                                      <span className="text-[10px] text-muted-foreground">
                                        {new Date(r.createdAt).toLocaleDateString("pt-BR", {
                                          day: "numeric",
                                          month: "short",
                                          year: "numeric",
                                        })}
                                      </span>
                                      {canDeleteByName(r.authorName) && (
                                        <button
                                          type="button"
                                          onClick={() => handleDeleteReply(c.id, r.id)}
                                          className="inline-flex items-center gap-1 text-[10px] text-muted-foreground hover:text-destructive"
                                        >
                                          <Trash2 className="h-3 w-3" />
                                          Excluir
                                        </button>
                                      )}
                                    </div>
                                    <p className="mt-1 text-xs text-muted-foreground">{r.text}</p>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                }) : (
                  <p className="text-center text-muted-foreground py-6">
                    Nenhum comentario ainda. Seja o primeiro a contribuir.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
