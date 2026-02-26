"use client"

import { useState, useRef } from "react"
import { UploadCloud, X, FileText, Image as ImageIcon, Link2, FileType, FileLineChart, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { uploadService, AttachmentResponse } from "@/src/services/uploadService"

interface AttachmentUploaderProps {
    onAttachmentsChange: (attachments: AttachmentResponse[]) => void
}

export function AttachmentUploader({ onAttachmentsChange }: AttachmentUploaderProps) {
    const [attachments, setAttachments] = useState<AttachmentResponse[]>([])
    const [linkInput, setLinkInput] = useState("")
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const notifyChange = (newAttachments: AttachmentResponse[]) => {
        setAttachments(newAttachments)
        onAttachmentsChange(newAttachments)
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return

        const files = Array.from(e.target.files)
        setIsUploading(true)

        for (const file of files) {
            try {
                const response = await uploadService.uploadFile(file)
                setAttachments(prev => {
                    const updated = [...prev, response]
                    onAttachmentsChange(updated)
                    return updated
                })
            } catch (error) {
                toast.error(`Falha ao subir o arquivo: ${file.name}`)
            }
        }

        setIsUploading(false)
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    const handleAddLink = () => {
        if (!linkInput.trim()) return

        try {
            new URL(linkInput) // basic validation
            const newLinkItem: AttachmentResponse = {
                file_name: linkInput.trim(),
                file_type: "link",
                file_url: linkInput.trim()
            }
            notifyChange([...attachments, newLinkItem])
            setLinkInput("")
        } catch (_) {
            toast.error("Por favor, insira uma URL válida (ex: https://...)")
        }
    }

    const handleRemove = (indexToRemove: number) => {
        const filtered = attachments.filter((_, i) => i !== indexToRemove)
        notifyChange(filtered)
    }

    const renderIcon = (type: string) => {
        switch (type) {
            case "pdf": return <FileType className="h-5 w-5 text-red-500" />
            case "doc":
            case "docx": return <FileText className="h-5 w-5 text-blue-500" />
            case "xls":
            case "xlsx": return <FileLineChart className="h-5 w-5 text-green-600" />
            case "png":
            case "jpg":
            case "jpeg":
            case "webp": return <ImageIcon className="h-5 w-5 text-purple-500" />
            case "link": return <Link2 className="h-5 w-5 text-navy" />
            default: return <FileText className="h-5 w-5 text-gray-500" />
        }
    }

    return (
        <div className="flex flex-col gap-4">

            <div
                className={`relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center transition-colors 
                    ${isUploading ? "border-moss/50 bg-moss/5" : "border-border hover:border-moss/50 hover:bg-moss/5 cursor-pointer"}`}
                onClick={() => !isUploading && fileInputRef.current?.click()}
            >
                <input
                    type="file"
                    multiple
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.webp,.txt"
                    disabled={isUploading}
                />

                {isUploading ? (
                    <div className="flex flex-col items-center gap-2">
                        <Loader2 className="h-8 w-8 animate-spin text-moss" />
                        <p className="text-sm font-medium text-moss">Enviando arquivos...</p>
                    </div>
                ) : (
                    <>
                        <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                            <UploadCloud className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-1">Upload de Arquivos</h3>
                        <p className="text-xs text-muted-foreground max-w-[250px]">
                            Arraste ou clique para selecionar PDF, Word, Imagens ou Excel.
                        </p>
                    </>
                )}
            </div>

            <div className="flex gap-2 mb-2">
                <Input
                    placeholder="Adicionar link externo (Google Drive, Youtube...)"
                    value={linkInput}
                    onChange={(e) => setLinkInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddLink())}
                    className="bg-background"
                />
                <Button type="button" variant="secondary" onClick={handleAddLink}>
                    Anexar Link
                </Button>
            </div>

            {attachments.length > 0 && (
                <div className="flex flex-col gap-2 mt-2">
                    <p className="text-sm font-semibold text-navy">Anexos ({attachments.length})</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {attachments.map((att, i) => (
                            <div key={i} className="flex items-center justify-between p-3 border rounded-md bg-background shadow-sm group">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    {renderIcon(att.file_type)}
                                    <span className="text-sm font-medium truncate max-w-[150px] md:max-w-[200px]" title={att.file_name}>
                                        {att.file_type === 'link' ? new URL(att.file_name).hostname : att.file_name}
                                    </span>
                                </div>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-muted-foreground opacity-50 group-hover:opacity-100 hover:text-destructive"
                                    onClick={() => handleRemove(i)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
