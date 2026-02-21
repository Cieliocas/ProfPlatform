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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import type { Experience } from "@/lib/mock-data"

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

interface ExperienceDetailProps {
  experience: Experience
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
          {experience.tags.map((tag) => (
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
                {new Date(experience.createdAt).toLocaleDateString("pt-BR", {
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
          </CardContent>
        </Card>

        {/* Comments section */}
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
            <MessageSquare className="h-5 w-5 text-navy" />
            Comentarios ({experience.commentsCount})
          </h2>
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <Textarea
                placeholder="Compartilhe sua opiniao ou duvida sobre essa experiencia..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-24 resize-none border-border bg-background"
              />
              <div className="mt-3 flex justify-end">
                <Button
                  size="sm"
                  className="bg-navy text-warm-white hover:bg-navy/90"
                  disabled={!comment.trim()}
                >
                  Comentar
                </Button>
              </div>

              <Separator className="my-6" />

              {/* Sample comments */}
              <div className="space-y-6">
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-mustard/10 text-xs font-semibold text-navy">
                      PM
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">
                        Patricia Martins
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ha 3 dias
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Adorei essa pratica! Vou adaptar para minha turma de 6o ano. Voce acha que funciona bem com turmas maiores, de 35 alunos?
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-moss/10 text-xs font-semibold text-moss">
                      RL
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">
                        Rafael Lima
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ha 5 dias
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Apliquei semana passada e os resultados foram otimos. Os alunos ficaram muito engajados. Obrigado por compartilhar!
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
