"use client"

import { Search, SlidersHorizontal, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { allTags, classifications, disciplines } from "@/src/lib/mock-data"

interface FiltersProps {
  search: string
  onSearchChange: (value: string) => void
  selectedClassification: string
  onClassificationChange: (value: string) => void
  selectedDiscipline: string
  onDisciplineChange: (value: string) => void
  selectedTags: string[]
  onTagToggle: (tag: string) => void
  onClearAll: () => void
}

export function Filters({
  search,
  onSearchChange,
  selectedClassification,
  onClassificationChange,
  selectedDiscipline,
  onDisciplineChange,
  selectedTags,
  onTagToggle,
  onClearAll,
}: FiltersProps) {
  const hasFilters = search || selectedClassification || selectedDiscipline || selectedTags.length > 0

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar experiencias..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>
        <Select value={selectedClassification} onValueChange={onClassificationChange}>
          <SelectTrigger className="w-full sm:w-48 bg-card border-border">
            <SlidersHorizontal className="mr-2 h-4 w-4 text-muted-foreground" />
            <SelectValue placeholder="Classificacao" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="Plano de aula simples">Plano de aula simples</SelectItem>
            <SelectItem value="Sequência didática">Sequência didática</SelectItem>
            <SelectItem value="Experiência comum">Experiência comum</SelectItem>
            <SelectItem value="Informação">Informação</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedDiscipline} onValueChange={onDisciplineChange}>
          <SelectTrigger className="w-full sm:w-48 bg-card border-border">
            <SlidersHorizontal className="mr-2 h-4 w-4 text-muted-foreground" />
            <SelectValue placeholder="Disciplina" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as ciencias</SelectItem>
            <SelectItem value="Biologia">Biologia</SelectItem>
            <SelectItem value="Química">Química</SelectItem>
            <SelectItem value="Física">Física</SelectItem>
          </SelectContent>
        </Select>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="mr-1 h-4 w-4" />
            Limpar
          </Button>
        )}
      </div>

      {/* Tag chips */}
      <div className="flex flex-wrap gap-2">
        {allTags.slice(0, 12).map((tag) => {
          const isSelected = selectedTags.includes(tag)
          return (
            <button
              key={tag}
              type="button"
              onClick={() => onTagToggle(tag)}
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
    </div>
  )
}
