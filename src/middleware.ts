import {NextRequest, NextResponse} from "next/server";
import {verifyToken} from "@/lib/auth";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('user-token')?.value;

    const verifiedToken = token &&
        (await verifyToken(token).catch((err) => {
            console.error(err.message);
        }));

    if (req.nextUrl.pathname.startsWith('/auth') && !verifiedToken) {
        return NextResponse.next();
    }

    const url = req.url;

    if (url.includes('/auth') && verifiedToken) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    if (!verifiedToken) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/auth/:path*'],
}