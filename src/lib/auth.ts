import {jwtVerify} from 'jose';

export const verifyToken = async (token: string) => {
    return await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET as string));
}

type LoginData = {
    email: string;
    password: string;
}

export const login = async (loginData: LoginData) => {
    const response = await fetch(`/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })

    switch (response.status) {
        case 200:
            return response.json();
        default:
            throw await response.json();
    }
}

export const logout = async () => {
    const response = await fetch(`/api/logout`, {
        method: 'GET'
    });

    switch (response.status) {
        case 200:
            return response.json();
        default:
            throw await response.json();
    }
}

export const register = async (loginData: LoginData) => {
    const response = await fetch(`/api/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })

    switch (response.status) {
        case 200:
            return response.json();
        default:
            throw await response.json();
    }
}

export const me = async () => {
    const response = await fetch(`/api/me`, {
        method: 'GET'
    });

    switch (response.status) {
        case 200:
            return response.json();
        default:
            throw await response.json();
    }
}