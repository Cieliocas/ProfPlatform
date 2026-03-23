import { NextResponse } from 'next/server';
import { DEMO_TOKEN, DEMO_USER } from '@/src/lib/demo-user';

export async function GET(request: Request) {
    try {
        // Extrair token do cookie
        const token = request.headers.get('cookie')
            ?.split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1];

        if (!token) {
            return NextResponse.json({ detail: 'No auth token found' }, { status: 401 });
        }

        if (token === DEMO_TOKEN) {
            return NextResponse.json(DEMO_USER, { status: 200 });
        }

        // Repassar para o FastAPI
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(data, { status: response.status });
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error('Me Route Error:', error);
        return NextResponse.json({ detail: 'Internal Server Error' }, { status: 500 });
    }
}
