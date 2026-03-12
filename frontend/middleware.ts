import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Mapeamento de rotas protegidas
const protectedRoutes = ['/dashboard', '/perfil', '/experiencia', '/minhas-sdis', '/salvos']

// Mapeamento de rotas de auth (não deve acessar se já estiver logado logicamente, mas opcional redirecionar)
const authRoutes = ['/login', '/cadastro']

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    const { pathname } = request.nextUrl

    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
    const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

    if (isProtectedRoute && !token) {
        // Redireciona para o login caso não tenha token
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (isAuthRoute && token) {
        // Redireciona para o dashboard caso já tenha token e tente acessar login/cadastro
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
}

// Configura em quais caminhos o middleware deve rodar
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}
