'use server'

import {jwtVerify, SignJWT} from 'jose';
import prisma from "@/lib/prisma";
import {cookies} from "next/headers";
import {z} from "zod";
import {LoginDataType, RegisterDataType} from "@/types/auth";
import {redirect} from "next/navigation";
import {createHash} from "crypto";

export const verifyToken = async (token: string) => {
    return await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET as string));
}

export const login = async (data: LoginDataType) => {
    // verify if email and password are not empty
    if (!data.email || !data.password) {
        throw new Error('Missing email and/or password');
    }

    // verify if email exists
    const user = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    });
    if (!user) {
        throw new Error('Email does not exist');
    }

    // Hash password
    const hash = createHash('sha256').update(data.password).digest('hex')

    // verify if password is correct
    if (user.password !== hash) {
        throw new Error('Password is incorrect');
    }

    // create jwt token
    const token = await new SignJWT({id: user.id})
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(new TextEncoder().encode(process.env.JWT_SECRET as string));

    // set cookie with jwt token
    cookies().set('user-token', token, {
        httpOnly: true,
    });

    redirect('/dashboard');
}

export const logout = () => {
    // delete cookie with jwt token
    cookies().delete('user-token')

    redirect('/auth/login');
}

export const register = async (data: RegisterDataType) => {
    // verify if name, email, password and confirm_password are not empty
    if (!data.name || !data.email || !data.password || !data.confirm_password) {
        throw new Error('Missing name, email, password and/or confirm_password');
    }

    // verify if password and confirm_password are the same
    if (data.password !== data.confirm_password) {
        throw new Error('Password and confirm password are not the same');
    }

    // verify if email already exists
    const user = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    });
    if (user) {
        throw new Error('Email already exists');
    }

    // verify if password is strong enough
    const passwordSchema = z.string().min(8).max(100).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/);
    if (!passwordSchema.safeParse(data.password).success) {
        throw new Error('Password is not strong enough');
    }

    // Hash password
    const hash = createHash('sha256').update(data.password).digest('hex')

    // create user
    const newUser = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hash
        }
    });

    // create jwt token
    const token = await new SignJWT({id: newUser.id})
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(new TextEncoder().encode(process.env.JWT_SECRET as string));

    // set cookie with jwt token
    cookies().set('user-token', token, {
        httpOnly: true,
    });

    redirect('/dashboard');
}