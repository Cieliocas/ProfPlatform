"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Mail, ArrowLeft } from "lucide-react"
import { authService } from "../../src/services/authService"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ForgotPasswordPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [isSuccess, setIsSuccess] = useState(false)

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
            <div className="w-full max-w-md">
                {/* Logo */}
                <Link href="/" className="mb-8 flex items-center justify-center gap-2.5">
                    <Image src="/logo-full.png" alt="Bioativa" width={180} height={60} priority className="object-contain" />
                </Link>

                <Card className="border-border bg-card">
                    <CardHeader className="pb-2 text-center">
                        <h1 className="text-xl font-bold text-foreground">Recuperacao de Senha</h1>
                        <p className="text-sm text-muted-foreground">
                            {isSuccess
                                ? "Verifique sua caixa de entrada."
                                : "Digite seu e-mail de cadastro para receber um link especial."}
                        </p>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-5 pt-4">

                        {isSuccess ? (
                            <div className="flex flex-col gap-4 text-center">
                                <div className="flex items-center justify-center rounded-lg bg-moss/20 p-4 text-moss border border-moss/30 mb-2">
                                    <p className="text-sm font-medium">As instrucoes foram enviadas. Por favor, cheque seu E-mail e a caixa de Spam (lixo eletronico).</p>
                                </div>
                                <Button variant="outline" className="w-full bg-transparent border-border" asChild>
                                    <Link href="/login">Voltar ao Login</Link>
                                </Button>
                            </div>
                        ) : (
                            <form
                                className="flex flex-col gap-4"
                                onSubmit={async (e) => {
                                    e.preventDefault()
                                    if (!email) return
                                    setIsLoading(true)
                                    try {
                                        await authService.forgotPassword(email)
                                        setIsSuccess(true)
                                    } catch (error: any) {
                                        toast.error(error.message || "Erro de rede. Tente novamente.")
                                        // Fallback preventivo caso a internet caia. O backend vai sempre dar OK pra nao vazar email mesmo se errar.
                                    } finally {
                                        setIsLoading(false)
                                    }
                                }}
                            >
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="email" className="text-sm font-medium">
                                        Endereço de Email
                                    </Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="seu@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="pl-10 border-border bg-background"
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-mustard text-navy hover:bg-mustard/90 font-semibold mt-2"
                                >
                                    {isLoading ? "Processando..." : "Enviar Link de Recuperacao"}
                                </Button>

                                <Link
                                    href="/login"
                                    className="mt-2 text-center text-sm font-semibold text-moss hover:text-moss/80 transition-colors flex items-center justify-center gap-1.5"
                                >
                                    <ArrowLeft className="h-4 w-4" /> Voltar para o Login
                                </Link>
                            </form>
                        )}

                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
