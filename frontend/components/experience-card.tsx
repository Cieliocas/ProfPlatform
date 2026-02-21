"use client"

import Link from "next/link"
import { ThumbsUp, Bookmark, MessageCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Experience } from "@/lib/mock-data"

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

export function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <Card className="group border-border bg-card transition-all hover:shadow-lg hover:-translate-y-0.5">
      <CardContent className="flex flex-col gap-4 p-6">
        {/* Author row */}
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-moss/20">
            <AvatarFallback className="bg-moss/10 text-xs font-semibold text-moss">
              {getInitials(experience.author.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Link
              href={`/perfil/${experience.author.id}`}
              className="text-sm font-semibold text-foreground hover:text-navy transition-colors"
            >
              {experience.author.name}
            </Link>
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

        {/* Title and context */}
        <div>
          <Link href={`/experiencia/${experience.id}`}>
            <h3 className="text-lg font-bold leading-snug text-foreground group-hover:text-navy transition-colors">
              {experience.title}
            </h3>
          </Link>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {experience.content}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {experience.tags.slice(0, 4).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-secondary text-secondary-foreground text-xs font-medium"
            >
              {tag}
            </Badge>
          ))}
          {experience.tags.length > 4 && (
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground text-xs">
              +{experience.tags.length - 4}
            </Badge>
          )}
        </div>

        {/* Interactions */}
        <div className="flex items-center gap-4 border-t border-border pt-4">
          <button
            type="button"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-mustard"
            aria-label={`${experience.upvotes} aprovacoes`}
          >
            <ThumbsUp className="h-4 w-4" />
            <span className="font-medium">{experience.upvotes}</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-moss"
            aria-label={`${experience.savedCount} vezes salva`}
          >
            <Bookmark className="h-4 w-4" />
            <span className="font-medium">{experience.savedCount}</span>
          </button>
          <Link
            href={`/experiencia/${experience.id}`}
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-navy"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="font-medium">{experience.commentsCount}</span>
          </Link>
          <span className="ml-auto text-xs text-muted-foreground">
            {new Date(experience.createdAt).toLocaleDateString("pt-BR", {
              day: "numeric",
              month: "short",
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
