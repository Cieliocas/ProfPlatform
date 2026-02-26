"use client"

import { useEffect, useState, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { authService } from "../../src/services/authService"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"

function EmailConfirmationProcess() {
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
    const [message, setMessage] = useState("Verificando a autenticidade do seu link...")

    useEffect(() => {
        if (!token) {
            setStatus("error")
            setMessage("O link de confirmacao e invalido ou esta incompleto.")
            return
        }

        const verifyToken = async () => {
            try {
                const response = await authService.confirmEmail(token)
                setStatus("success")
                setMessage(response.message || "E-mail confirmado com sucesso!")
            } catch (error: any) {
                setStatus("error")
                const detail = error.response?.data?.detail;
                let errorMessage = "Este link expirou ou ja foi utilizado.";

                if (typeof detail === "string") {
                    errorMessage = detail;
                } else if (Array.isArray(detail) && detail.length > 0 && detail[0].msg) {
                    errorMessage = detail[0].msg; // Pydantic ValidationError extraxtion
                }

                setMessage(errorMessage)
            }
        }

        verifyToken()
    }, [token])

    return (
        <div className="flex flex-col items-center justify-center gap-6 py-4 text-center">
            {status === "loading" && (
                <>
                    <Loader2 className="h-16 w-16 text-mustard animate-spin" />
                    <p className="text-muted-foreground">{message}</p>
                </>
            )}

            {status === "success" && (
                <>
                    <div className="rounded-full bg-moss/20 p-4">
                        <CheckCircle2 className="h-16 w-16 text-moss" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold text-foreground">E-mail Confirmado!</h2>
                        <p className="text-muted-foreground">{message}</p>
                    </div>
                    <Button className="w-full bg-navy text-warm-white hover:bg-navy/90 mt-4" asChild>
                        <Link href="/login">Ir para o Login</Link>
                    </Button>
                </>
            )}

            {status === "error" && (
                <>
                    <div className="rounded-full bg-destructive/10 p-4">
                        <XCircle className="h-16 w-16 text-destructive" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold text-foreground">Algo deu errado</h2>
                        <p className="text-muted-foreground">{message}</p>
                    </div>
                    <Button className="w-full bg-mustard text-navy hover:bg-mustard/90 mt-4" asChild>
                        <Link href="/cadastro">Fazer um Novo Cadastro</Link>
                    </Button>
                </>
            )}
        </div>
    )
}

export default function ConfirmEmailPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
            <div className="w-full max-w-md">
                <Link href="/" className="mb-8 flex items-center justify-center gap-2.5">
                    <Image src="/logo-full.png" alt="Bioativa" width={180} height={60} priority className="object-contain" />
                </Link>

                <Card className="border-border bg-card">
                    <CardHeader className="pb-2 text-center">
                        <h1 className="text-2xl font-bold text-foreground">Ativacao de Conta</h1>
                    </CardHeader>
                    <CardContent>
                        <Suspense fallback={<div className="flex justify-center py-10"><Loader2 className="h-8 w-8 animate-spin text-mustard" /></div>}>
                            <EmailConfirmationProcess />
                        </Suspense>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
