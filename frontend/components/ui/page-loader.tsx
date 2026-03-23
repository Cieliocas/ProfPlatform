"use client"

import { Loader2 } from "lucide-react"

export function PageLoader({ label = "Carregando..." }: { label?: string }) {
  return (
    <div className="flex min-h-[45vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-muted-foreground">
        <Loader2 className="h-7 w-7 animate-spin text-moss" />
        <p className="text-sm">{label}</p>
      </div>
    </div>
  )
}

