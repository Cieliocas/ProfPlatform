"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Settings, Eye, EyeOff, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { authService } from "@/src/services/authService"
import { User } from "@/src/types/auth"

interface EditProfileDialogProps {
    user: User
    onSuccess: () => void
}

export function EditProfileDialog({ user, onSuccess }: EditProfileDialogProps) {
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [formData, setFormData] = useState({
        name: user.name || "",
        bio: user.bio || "",
        location_city: user.location_city || "",
        location_state: user.location_state || "",
        location_country: user.location_country || "Brasil",
        graduation_level: user.graduation_level || "",
        workplace: user.workplace || "",
        instagram_link: user.instagram_link || "",
        email_link: user.email_link || user.email || "",
        custom_link: user.custom_link || "",

        show_location: user.show_location ?? true,
        show_graduation: user.show_graduation ?? true,
        show_workplace: user.show_workplace ?? true,
        show_socials: user.show_socials ?? true,
    })

    const handleChange = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            await authService.updateProfile(formData)
            toast.success("Perfil atualizado com sucesso!")
            setOpen(false)
            onSuccess()
        } catch (error: any) {
            toast.error(error.message || "Erro ao atualizar perfil")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="self-start sm:self-auto">
                    <Settings className="mr-2 h-4 w-4" />
                    Editar Perfil
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Editar Perfil</DialogTitle>
                    <DialogDescription>
                        Atualize suas informações profissonais. Você pode escolher quais dados ficarão visíveis publicamente.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-navy">Informações Básicas</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nome Completo</Label>
                                <Input id="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio">Bibiografia (Bio)</Label>
                                <Textarea id="bio" value={formData.bio} onChange={(e) => handleChange("bio", e.target.value)} rows={3} />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-navy">Localização</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Switch
                                    checked={formData.show_location}
                                    onCheckedChange={(c) => handleChange("show_location", c)}
                                />
                                {formData.show_location ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />} Exibir no Perfil
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="city">Cidade</Label>
                                <Input id="city" value={formData.location_city} onChange={(e) => handleChange("location_city", e.target.value)} disabled={!formData.show_location} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="state">Estado</Label>
                                <Input id="state" value={formData.location_state} onChange={(e) => handleChange("location_state", e.target.value)} disabled={!formData.show_location} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="country">País</Label>
                                <Input id="country" value={formData.location_country} onChange={(e) => handleChange("location_country", e.target.value)} disabled={!formData.show_location} />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-navy">Formação</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Switch
                                    checked={formData.show_graduation}
                                    onCheckedChange={(c) => handleChange("show_graduation", c)}
                                />
                                {formData.show_graduation ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />} Exibir no Perfil
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="graduation">Nível de Graduação / Curso</Label>
                            <Input id="graduation" placeholder="Ex: Mestrado em Educação" value={formData.graduation_level} onChange={(e) => handleChange("graduation_level", e.target.value)} disabled={!formData.show_graduation} />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-navy">Ocupação</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Switch
                                    checked={formData.show_workplace}
                                    onCheckedChange={(c) => handleChange("show_workplace", c)}
                                />
                                {formData.show_workplace ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />} Exibir no Perfil
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="workplace">Onde trabalha atualmente</Label>
                            <Input id="workplace" placeholder="Ex: Escola Estadual Machado de Assis" value={formData.workplace} onChange={(e) => handleChange("workplace", e.target.value)} disabled={!formData.show_workplace} />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-navy">Redes Sociais e Contato</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Switch
                                    checked={formData.show_socials}
                                    onCheckedChange={(c) => handleChange("show_socials", c)}
                                />
                                {formData.show_socials ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />} Exibir no Perfil
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="instagram">Instagram</Label>
                                <Input id="instagram" placeholder="@seuusuario" value={formData.instagram_link} onChange={(e) => handleChange("instagram_link", e.target.value)} disabled={!formData.show_socials} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email_link">E-mail para Contato</Label>
                                <Input id="email_link" type="email" value={formData.email_link} onChange={(e) => handleChange("email_link", e.target.value)} disabled={!formData.show_socials} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="custom_link">Site Pessoal / Lattes</Label>
                                <Input id="custom_link" placeholder="https://..." value={formData.custom_link} onChange={(e) => handleChange("custom_link", e.target.value)} disabled={!formData.show_socials} />
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="mt-6">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isSubmitting}>
                            Cancelar
                        </Button>
                        <Button type="submit" className="bg-mustard text-navy hover:bg-mustard/90" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isSubmitting ? "Salvando..." : "Salvar Alterações"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
