"use client"

import { useState, useEffect } from "react"
import { MapPin, GraduationCap, BookOpen, Loader2 } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { authService } from "@/src/services/authService"
import { User } from "@/src/types/auth"

interface PublicProfileDialogProps {
    authorId: string | number
    authorName: string // Used before data loads
    children: React.ReactNode // The trigger element (e.g. the Link or Button)
}

function getInitials(name: string) {
    return name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
}

export function PublicProfileDialog({ authorId, authorName, children }: PublicProfileDialogProps) {
    const [open, setOpen] = useState(false)
    const [profile, setProfile] = useState<User | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (open && !profile) {
            setLoading(true)
            authService.getPublicProfile(authorId)
                .then(setProfile)
                .catch(console.error)
                .finally(() => setLoading(false))
        }
    }, [open, authorId, profile])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="mb-4">
                    <DialogTitle className="text-center font-bold text-xl hidden">Perfil de {authorName}</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col items-center justify-center text-center">
                    <Avatar className="h-20 w-20 border-2 border-moss/20 mb-4">
                        <AvatarFallback className="bg-moss/10 text-xl font-bold text-moss">
                            {getInitials(profile?.name || authorName)}
                        </AvatarFallback>
                    </Avatar>

                    <h2 className="text-xl font-bold tracking-tight text-foreground">
                        {profile?.name || authorName}
                    </h2>

                    {loading ? (
                        <div className="flex justify-center my-8">
                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        </div>
                    ) : profile ? (
                        <div className="w-full mt-4 flex flex-col gap-4">

                            <div className="flex flex-col gap-2 items-center text-sm text-muted-foreground w-full">
                                {(profile as any).location_city && (profile as any).location_state && (
                                    <span className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        {(profile as any).location_city}, {(profile as any).location_state} - {(profile as any).location_country}
                                    </span>
                                )}
                                {(profile as any).graduation_level && (
                                    <span className="flex items-center gap-1">
                                        <GraduationCap className="h-4 w-4" />
                                        {(profile as any).graduation_level}
                                    </span>
                                )}
                                {(profile as any).workplace && (
                                    <span className="flex items-center gap-1">
                                        <BookOpen className="h-4 w-4" />
                                        {(profile as any).workplace}
                                    </span>
                                )}
                            </div>

                            {profile.bio && (
                                <p className="text-sm leading-relaxed text-muted-foreground bg-secondary/50 p-4 rounded-md">
                                    "{profile.bio}"
                                </p>
                            )}

                            {((profile as any).instagram_link || (profile as any).email_link || (profile as any).custom_link) && (
                                <div className="mt-2 flex flex-wrap justify-center items-center gap-4 text-sm border-t pt-4">
                                    {(profile as any).instagram_link && (
                                        <a href={`https://instagram.com/${(profile as any).instagram_link.replace('@', '')}`} target="_blank" className="text-mustard hover:underline font-medium">
                                            Instagram
                                        </a>
                                    )}
                                    {(profile as any).custom_link && (
                                        <a href={(profile as any).custom_link} target="_blank" className="text-mustard hover:underline font-medium">
                                            Site
                                        </a>
                                    )}
                                    {(profile as any).email_link && (
                                        <a href={`mailto:${(profile as any).email_link}`} className="text-mustard hover:underline font-medium">
                                            E-mail
                                        </a>
                                    )}
                                </div>
                            )}

                        </div>
                    ) : (
                        <div className="my-8 text-sm text-muted-foreground">
                            Não foi possível carregar as informações do usuário.
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
