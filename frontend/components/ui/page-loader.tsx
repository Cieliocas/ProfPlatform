"use client"

import { Loader2 } from "lucide-react"

export function PageLoader({ label = "Carregando..." }: { label?: string }) {
  return (
    <div className="flex min-h-[45vh] items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin text-moss" />
          <p className="text-sm font-medium">{label}</p>
        </div>
        <div className="space-y-3">
          <div className="h-4 w-2/3 animate-pulse rounded bg-secondary" />
          <div className="h-4 w-full animate-pulse rounded bg-secondary" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-secondary" />
        </div>
      </div>
    </div>
  )
}
