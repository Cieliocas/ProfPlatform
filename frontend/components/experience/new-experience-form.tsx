"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, X, Plus, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { allTags, classifications, disciplines } from "@/src/lib/mock-data"
import { experienceService } from "@/src/services/experienceService"
import { AttachmentUploader } from "./attachment-uploader"
import { AttachmentResponse } from "@/src/services/uploadService"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export function NewExperienceForm() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [classification, setClassification] = useState("")
  const [discipline, setDiscipline] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [attachments, setAttachments] = useState<AttachmentResponse[]>([])
  const [submitted, setSubmitted] = useState(false)

  function handleTagToggle(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  function handleAddCustomTag() {
    const trimmed = tagInput.trim()
    if (trimmed && !selectedTags.includes(trimmed)) {
      setSelectedTags((prev) => [...prev, trimmed])
      setTagInput("")
    }
  }

  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await experienceService.createExperience({
        title,
        content,
        classification,
        discipline,
        tags: selectedTags,
        attachments: attachments,
      })
      setSubmitted(true)
      toast.success("Experiência criada com sucesso!")
    } catch (error) {
      console.error(error)
      toast.error("Erro ao publicar a experiência. Verifique se está logado e atende os requisitos mínimos.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center lg:px-8">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-moss/15">
          <Send className="h-10 w-10 text-moss" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          Experiencia Enviada!
        </h2>
        <p className="mt-3 text-muted-foreground">
          Sua pratica pedagogica foi compartilhada com sucesso. Outros
          professores ja podem ve-la no feed.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button className="bg-mustard text-navy hover:bg-mustard/90 font-semibold" asChild>
            <Link href="/dashboard">Ver no Feed</Link>
          </Button>
          <Button variant="outline" onClick={() => setSubmitted(false)}>
            Compartilhar Outra
          </Button>
        </div>
      </div>
    )
  }

  const isInvalidToSubmit =
    !title ||
    !content ||
    !classification ||
    !discipline ||
    (classification !== "Informação" && attachments.length === 0) ||
    isSubmitting

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 lg:px-8">
      <Link
        href="/dashboard"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar ao Feed
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Compartilhar Experiencia
        </h1>
        <p className="mt-2 text-muted-foreground">
          Descreva sua pratica pedagogica para que outros professores possam se
          inspirar e aplicar em suas salas de aula.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Title */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-base text-navy">
              Informacoes Basicas
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Titulo da Experiencia *
              </Label>
              <Input
                id="title"
                placeholder='Ex: "Horta Pedagogica: Ciencias na Pratica"'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="border-border bg-background"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="classification" className="text-sm font-medium">
                  Classificacao *
                </Label>
                <Select value={classification} onValueChange={setClassification} required>
                  <SelectTrigger className="border-border bg-background">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {classifications.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="discipline" className="text-sm font-medium">
                  Disciplina *
                </Label>
                <Select value={discipline} onValueChange={setDiscipline} required>
                  <SelectTrigger className="border-border bg-background">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {disciplines.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-base text-navy">
              Detalhes da Pratica
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="content" className="text-sm font-medium">
                Conteudo da Experiencia *
              </Label>
              <p className="text-xs text-muted-foreground">
                Descreva todo o processo, contexto, e materiais necessarios.
                Fique livre para estruturar da forma que achar melhor.
              </p>
              <Textarea
                id="content"
                placeholder="Introducao ao tema...&#10;Passo 1...&#10;Materiais..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="min-h-64 resize-y border-border bg-background"
              />
            </div>
          </CardContent>
        </Card>

        {/* Attachments Upload */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-base text-navy">
              Anexos da Publicação
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <p className="text-xs text-muted-foreground mb-2">
                {classification === 'Informação'
                  ? "Anexos e Links Opcionais (Seu post de tipo Informação pode ser publicado sem fotos)."
                  : "Obrigatório adicionar pelo menos 1 Arquivo ou Link de embasamento."}
              </p>
              <AttachmentUploader onAttachmentsChange={setAttachments} />
            </div>
          </CardContent>
        </Card>

        {/* Tags */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-base text-navy">Tags</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-xs text-muted-foreground">
              Selecione tags existentes ou crie novas para facilitar a busca.
            </p>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => {
                const isSelected = selectedTags.includes(tag)
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${isSelected
                      ? "bg-navy text-warm-white"
                      : "bg-secondary text-secondary-foreground hover:bg-border"
                      }`}
                  >
                    {tag}
                  </button>
                )
              })}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Adicionar tag personalizada..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddCustomTag()
                  }
                }}
                className="border-border bg-background"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleAddCustomTag}
                className="flex-shrink-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {selectedTags.map((tag) => (
                  <Badge
                    key={tag}
                    className="bg-navy text-warm-white flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleTagToggle(tag)}
                      className="ml-0.5 hover:text-mustard"
                      aria-label={`Remover tag ${tag}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button variant="outline" type="button" asChild>
            <Link href="/dashboard">Cancelar</Link>
          </Button>
          <Button
            type="submit"
            className="bg-mustard text-navy hover:bg-mustard/90 font-semibold"
            disabled={isInvalidToSubmit}
            title={isInvalidToSubmit ? "Preencha todos os campos obrigatórios e envie um anexo válido." : "Publicar"}
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            {isSubmitting ? "Publicando..." : "Publicar Experiencia"}
          </Button>
        </div>
      </form>
    </div>
  )
}
