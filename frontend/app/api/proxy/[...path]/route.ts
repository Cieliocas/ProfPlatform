import { NextRequest, NextResponse } from 'next/server';

async function handler(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
    const params = await context.params;
    const path = params.path.join('/');
    // Check if the URL contains query parameters
    const url = new URL(request.url);
    const searchParams = url.search;

    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/${path}${searchParams}`;

    const token = request.cookies.get('token')?.value;

    const headers = new Headers(request.headers);
    // Remover o host evitará problemas de SSL/TLS ou CORS com o backend
    headers.delete('host');
    headers.delete('cookie'); // Remove todos os cookies do Next.js antes de enviar ao backend

    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    try {
        const fetchOptions: RequestInit = {
            method: request.method,
            headers: headers,
        };

        if (request.method !== 'GET' && request.method !== 'HEAD') {
            // Lendo todo o buffer de memória evita que a Vercel/NextJS Engula o Stream e mande pacotes vazios pro Render.
            const buffer = await request.arrayBuffer();
            fetchOptions.body = buffer;
        }

        const response = await fetch(backendUrl, fetchOptions);

        const responseHeaders = new Headers(response.headers);

        if (response.status === 204) {
            return new NextResponse(null, {
                status: 204,
                headers: responseHeaders,
            });
        }

        // Não enviar encodings comprimidos pro browser pois o next.js pode re-comprimir e corromper
        responseHeaders.delete('content-encoding');

        return new NextResponse(response.body, {
            status: response.status,
            headers: responseHeaders,
        });
    } catch (error) {
        console.error('Proxy Error:', error);
        return NextResponse.json({ detail: 'Error proxying request to backend' }, { status: 500 });
    }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;
