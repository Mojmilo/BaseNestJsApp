import {NextResponse} from "next/server";

export async function GET(request: Request) {
    // delete cookie with jwt token
    const response = NextResponse.json({message: 'Logged out'}, {status: 200})
    response.cookies.delete('user-token')

    return response
}