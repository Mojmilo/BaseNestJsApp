"use client"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {useEffect, useState} from "react";
import {login} from "@/lib/auth";
import Link from "next/link";
import {useRouter} from "next/navigation";

type LoginData = {
    email: string;
    password: string;
}

export function ConnectAccount() {
    const [data, setData] = useState<LoginData>({
        email: '',
        password: ''
    });

    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const user = await login(data);
            if (user) {
                window.location.reload();
            }
        } catch (error: any) {
            setError(error.error);
        }
    }

    useEffect(() => {
        if (error) {
            setError(null)
        }
    }, [data])

    return (
        <form onSubmit={handleSubmit} className={'w-1/3'}>
            <Card>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Connect your account</CardTitle>
                    <CardDescription>
                        Enter your email below to connect your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid grid-cols-2 gap-6">
                        <Button variant="outline" disabled>
                            <Icons.gitHub className="mr-2 h-4 w-4" />
                            Github
                        </Button>
                        <Button variant="outline" disabled>
                            <Icons.google className="mr-2 h-4 w-4" />
                            Google
                        </Button>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                              Or continue with
                            </span>
                        </div>
                    </div>
                    <span className={`${error ? 'block' : 'hidden'} text-sm text-destructive`}>{error}</span>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" value={data.email} onChange={e => setData({...data, email: e.target.value})} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" value={data.password} onChange={e => setData({...data, password: e.target.value})} />
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="flex flex-col items-start justify-center gap-2 w-full">
                        <Button type={'submit'} className="w-full">Connect</Button>
                        <span className={`text-sm text-muted-foreground`}>Don't have an account? <Link href={'/register'} className={'text-primary underline'}>Register</Link></span>
                    </div>
                </CardFooter>
            </Card>
        </form>
    )
}