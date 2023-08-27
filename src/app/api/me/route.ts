import {NextRequest, NextResponse} from "next/server";
import {UserType} from "@/types/users";
import {PrismaClient, User} from "@prisma/client";
import {decodeJwt, SignJWT} from 'jose';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    const jwtToken = request.cookies.get('user-token')?.value as string;

    const payload = jwtToken ? decodeJwt(jwtToken) : null;

    const id = payload?.id as number;

    if (!id) {
        return NextResponse.json({
            error: 'User does not exist'
        }, {status: 400})
    }

    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    });
    if (!user) {
        return NextResponse.json({
            error: 'User does not exist'
        }, {status: 400})
    }

    return NextResponse.json(user, {status: 200})
}