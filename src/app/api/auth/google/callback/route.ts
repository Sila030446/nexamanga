// app/api/auth/google/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { AUTHENTICATION_COOKIE, REFRESH_TOKEN_COOKIE } from '@/app/(auth)/contexts/auth-cookie';
import { jwtDecode } from "jwt-decode";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    // Validate tokens (you should add more robust validation)
    if (!accessToken || !refreshToken) {
        return NextResponse.redirect(new URL('/login', request.url), {
            status: 302,
        });
    }

    try {
        // Set cookies securely
        const cookieStore = cookies();

        // HttpOnly cookie for access token
        cookieStore.set(AUTHENTICATION_COOKIE, accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            expires: new Date(jwtDecode(accessToken).exp! * 1000),
            path: '/'
        });

        // HttpOnly cookie for refresh token
        cookieStore.set(REFRESH_TOKEN_COOKIE, refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            expires: new Date(jwtDecode(refreshToken).exp! * 1000),
            path: '/'
        });

        // Redirect to a protected route or dashboard
        return NextResponse.redirect(new URL('/', request.url), {
            status: 302,
        });
    } catch (error) {
        console.error('Authentication error:', error);

        // Handle error scenario
        return NextResponse.redirect(new URL('/login?error=auth_failed', request.url), {
            status: 302,
        });
    }
}