"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Lock, Eye, EyeOff, ArrowRight } from "lucide-react"
import { authService } from "../../src/services/authService"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

function ResetPasswordForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isSuccess, setIsSuccess] = useState(false)

    if (!token) {
        return (
            <div className="text-center py-6">
                <p className="text-destructive font-medium mb-4">Link Invalido ou Expirado.</p>
                <Button asChild className="bg-mustard text-navy hover:bg-mustard/90">
                    <Link href="/esqueci-senha">Solicitar Novo Link</Link>
                </Button>
            </div>
        )
    }

    if (isSuccess) {
        return (
            <div className="flex flex-col gap-4 text-center">
                <div className="flex items-center justify-center rounded-lg bg-moss/20 p-4 text-moss border border-moss/30 mb-2">
                    <p className="text-sm font-medium">Sua senha foi alterada com sucesso! Voce ja pode acessar sua conta.</p>
                </div>
                <Button className="w-full bg-navy text-warm-white hover:bg-navy/90" asChild>
                    <Link href="/login">Ir para o Login <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </div>
        )
    }

    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={async (e) => {
                e.preventDefault()
                if (password !== confirmPassword) {
                    toast.error("As senhas nao coincidem.")
                    return
                }
                if (password.length < 6) {
                    toast.error("A senha deve ter pelo menos 6 caracteres.")
                    return
                }

                setIsLoading(true)
                try {
                    await authService.resetPassword(token, password)
                    toast.success("Senha alterada com sucesso!")
                    setIsSuccess(true)
                } catch (error: any) {
                    const detail = error.response?.data?.detail;
                    let errorMessage = "Erro ao redefinir senha. Link pode ter expirado.";
                    if (typeof detail === "string") {
                        errorMessage = detail;
                    } else if (Array.isArray(detail) && detail.length > 0 && detail[0].msg) {
                        errorMessage = detail[0].msg;
                    }
                    toast.error(errorMessage)
                } finally {
                    setIsLoading(false)
                }
            }}
        >
            <div className="flex flex-col gap-2">
                <Label htmlFor="password" className="text-sm font-medium">Nova Senha</Label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Crie uma nova senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 border-border bg-background"
                        required
                        disabled={isLoading}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirme a Nova Senha</Label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Repita a nova senha"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-10 pr-10 border-border bg-background"
                        required
                        disabled={isLoading}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                </div>
            </div>

            <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-mustard text-navy hover:bg-mustard/90 font-semibold mt-2"
            >
                {isLoading ? "Salvando..." : "Salvar Nova Senha"}
            </Button>
        </form>
    )
}

export default function ResetPasswordPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
            <div className="w-full max-w-md">
                <Link href="/" className="mb-8 flex items-center justify-center gap-2.5">
                    <Image src="/logo-full.png" alt="Bioativa" width={180} height={60} priority className="object-contain" />
                </Link>

                <Card className="border-border bg-card">
                    <CardHeader className="pb-2 text-center">
                        <h1 className="text-xl font-bold text-foreground">Criar Nova Senha</h1>
                        <p className="text-sm text-muted-foreground">
                            Digite uma nova senha segura para sua conta.
                        </p>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <Suspense fallback={<div className="text-center py-4 text-sm text-muted-foreground">Carregando modulo de seguranca...</div>}>
                            <ResetPasswordForm />
                        </Suspense>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
