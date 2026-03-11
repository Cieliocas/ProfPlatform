"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FileType, FileText, FileLineChart, Image as ImageIcon, Link2, Download, ExternalLink } from "lucide-react"

interface DownloadPreviewDialogProps {
    attachment: any
    children: React.ReactNode
}

export function DownloadPreviewDialog({ attachment, children }: DownloadPreviewDialogProps) {
    const [open, setOpen] = useState(false)

    const isImage = ["png", "jpg", "jpeg", "webp", "gif", "image"].includes(attachment.file_type)
    const isLink = attachment.file_type === "link"

    // Se a url veio como path relativo interno, repriorizamos pro túnel Next.js evitar HTTP 404
    const realUrl = (!isLink && attachment?.file_url?.startsWith("/api/v1/"))
        ? `/api/proxy${attachment.file_url}`
        : (attachment?.file_url || "")

    // Para Links externos, apenas redirecionamos. Não há 'Preview' de HTML solto.
    if (isLink) {
        return (
            <a
                href={realUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-sm bg-secondary/50 px-2.5 py-1.5 text-xs font-medium text-secondary-foreground hover:bg-secondary transition-colors border max-w-full cursor-pointer"
                title={attachment.file_name}
            >
                {children}
            </a>
        )
    }

    const handleDownload = () => {
        // Tenta forçar o download direto via tag 'a' oculta e atributo download
        const link = document.createElement("a")
        link.href = realUrl
        link.download = attachment.file_name
        link.target = "_blank"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const getIcon = () => {
        switch (attachment.file_type?.toLowerCase()) {
            case "pdf": return <FileType className="h-16 w-16 text-destructive mb-4" />
            case "doc":
            case "docx": return <FileText className="h-16 w-16 text-blue-500 mb-4" />
            case "xls":
            case "xlsx": return <FileLineChart className="h-16 w-16 text-green-600 mb-4" />
            default: return <FileText className="h-16 w-16 text-muted-foreground mb-4" />
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button
                    className="inline-flex items-center gap-1.5 rounded-sm bg-secondary/50 px-2.5 py-1.5 text-xs font-medium text-secondary-foreground hover:bg-secondary transition-colors border max-w-full cursor-pointer"
                    title={`Visualizar ${attachment.file_name}`}
                >
                    {children}
                </button>
            </DialogTrigger>

            <DialogContent className={`${isImage ? "max-w-4xl p-2 bg-transparent border-0 shadow-none outline-none" : "sm:max-w-md"} [&>button]:text-white`}>
                {isImage ? (
                    <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={realUrl}
                            alt={attachment.file_name}
                            className="max-h-[75vh] w-auto object-contain rounded-md"
                        />
                        <Button
                            onClick={handleDownload}
                            className="bg-navy hover:bg-navy/90 text-white shadow-lg z-50 px-6 py-5"
                        >
                            <Download className="h-4 w-4 mr-2" />
                            Baixar Imagem
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center p-6 text-center">
                        {getIcon()}
                        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{attachment.file_name}</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                            Esta é uma mídia de documento. O pre-visualizador visual ainda não suporta extensões de texto interativo no Browser. Deseja realizar o download?
                        </p>

                        <div className="flex gap-3 w-full justify-center">
                            <Button variant="outline" onClick={() => setOpen(false)}>
                                Cancelar
                            </Button>
                            <Button onClick={handleDownload} className="bg-navy hover:bg-navy/90 text-white">
                                <Download className="mr-2 h-4 w-4" />
                                Fazer Download
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
