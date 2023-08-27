import {UserType} from "@/types/users";
import {NextResponse} from "next/server";
import {z} from "zod";
import {PrismaClient} from "@prisma/client";
import {SignJWT} from 'jose';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const body: UserType = await request.json()

    // verify if name, email, password and confirm_password are not empty
    if (!body.name || !body.email || !body.password || !body.confirm_password) {
        return NextResponse.json({
            error: 'Missing name, email, password and/or confirm_password'
        }, {status: 400})
    }

    // verify if password and confirm_password are the same
    if (body.password !== body.confirm_password) {
        return NextResponse.json({
            error: 'Password and confirm password are not the same'
        }, {status: 400})
    }

    // verify if email already exists
    const user = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    });
    if (user) {
        return NextResponse.json({
            error: 'Email already exists'
        }, {status: 400})
    }

    // verify if password is strong enough
    const passwordSchema = z.string().min(8).max(100).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/);
    if (!passwordSchema.safeParse(body.password).success) {
        return NextResponse.json({
            error: 'Password is not strong enough'
        }, {status: 400})
    }

    // create user
    const newUser = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: body.password
        }
    });

    // create jwt token
    const jwtToken = await new SignJWT({id: newUser.id})
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(new TextEncoder().encode(process.env.JWT_SECRET as string))

    // set cookie with jwt token
    const response = NextResponse.json(newUser, {status: 200})
    response.cookies.set('user-token', jwtToken, {
        httpOnly: true,
    })

    return response
}