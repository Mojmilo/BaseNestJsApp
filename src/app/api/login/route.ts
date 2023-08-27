import {NextResponse} from "next/server";
import {UserType} from "@/types/users";
import {PrismaClient} from "@prisma/client";
import {SignJWT} from 'jose';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const body: UserType = await request.json()

    // verify if email and password are not empty
    if (!body.email || !body.password) {
        return NextResponse.json({
            error: 'Missing email and/or password'
        }, {status: 400})
    }

    // verify if email exists
    const user = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    });
    if (!user) {
        return NextResponse.json({
            error: 'Email does not exist'
        }, {status: 400})
    }

    // verify if password is correct
    if (user.password !== body.password) {
        return NextResponse.json({
            error: 'Password is incorrect'
        }, {status: 400})
    }

    // create jwt token
    const jwtToken = await new SignJWT({id: user.id})
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(new TextEncoder().encode(process.env.JWT_SECRET as string))

    // set cookie with jwt token
    const response = NextResponse.json(user, {status: 200})
    response.cookies.set('user-token', jwtToken, {
        httpOnly: true,
    })

    return response
}