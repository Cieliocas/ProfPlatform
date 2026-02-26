import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // FastAPI expects form encoded for OAuth2PasswordRequestForm
        const formData = new URLSearchParams();
        formData.append('username', body.email);
        formData.append('password', body.password);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(data, { status: response.status });
        }

        // Create the response and set the HttpOnly cookie
        const res = NextResponse.json({ success: true, ...data }, { status: 200 });

        // Set cookie manually or using NextResponse cookies
        res.cookies.set({
            name: 'token',
            value: data.access_token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax', // Use lax or strict for CSRF protection
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        return res;
    } catch (error) {
        console.error('Login Route Error:', error);
        return NextResponse.json({ detail: 'Internal Server Error' }, { status: 500 });
    }
}
