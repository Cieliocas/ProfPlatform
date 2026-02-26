import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json();
        const token = request.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.json({ detail: "Não autenticado." }, { status: 401 });
        }

        const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/me`;

        const response = await fetch(backendUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (response.status === 204) {
            const nextResponse = NextResponse.json({ detail: "Conta excluida com sucesso." }, { status: 200 });
            nextResponse.cookies.delete('token');
            return nextResponse;
        }

        const errorData = await response.json();
        return NextResponse.json(errorData, { status: response.status });
    } catch (error) {
        console.error('Delete Account Error:', error);
        return NextResponse.json({ detail: 'Erro interno no servidor' }, { status: 500 });
    }
}
