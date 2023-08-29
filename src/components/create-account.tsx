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
import {useEffect, useState, useTransition} from "react";
import {login, register} from "@/lib/auth";
import Link from "next/link";
import {RegisterDataType} from "@/types/auth";

export function CreateAccount() {
    const [isPending, startTransition] = useTransition()

    const [data, setData] = useState<RegisterDataType>({
        name: '',
        email: '',
        password: '',
        confirm_password: ''
    });
    const [levelPassword, setLevelPassword] = useState<number>(0);

    const [error, setError] = useState<string | null>(null);

    const action = (formData: FormData) => {
        startTransition(async () => {
            try {
                await register(data);
            } catch (error: any) {
                setError(error.message);
            }
        });
    }

    useEffect(() => {
        if (error) {
            setError(null)
        }
    }, [data])

    useEffect(() => {
        setLevelPassword(0);

        if (data.password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])/)) {
            setLevelPassword(1);
        }

        if (data.password.match(/((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,})/)) {
            setLevelPassword(2);
        }

        if (data.password.match(/((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{12,})/)) {
            setLevelPassword(3);
        }
    }, [data.password])

    return (
        <form action={action} className={'w-1/3'}>
            <Card>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Create an account</CardTitle>
                    <CardDescription>
                        Enter your email below to create your account
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
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" type="text" placeholder="John Doe" value={data.name} onChange={e => setData({...data, name: e.target.value})} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" value={data.email} onChange={e => setData({...data, email: e.target.value})} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" value={data.password} onChange={e => setData({...data, password: e.target.value})} />
                        <div className="flex flex-row justify-start items-center gap-5">
                            <div className="flex flex-row justify-start items-center gap-2">
                                <div className={`relative w-16 h-1 rounded-full bg-muted overflow-hidden`}>
                                    <div className={`absolute h-1 inset-0 rounded-full bg-red-500 ${levelPassword > 0 ? 'translate-x-0' : '-translate-x-full'} transition-all duration-150`}></div>
                                </div>
                                <div className={`relative w-16 h-1 rounded-full bg-muted overflow-hidden`}>
                                    <div className={`absolute h-1 inset-0 rounded-full bg-yellow-500 ${levelPassword > 1 ? 'translate-x-0' : '-translate-x-full'} transition-all duration-150`}></div>
                                </div>
                                <div className={`relative w-16 h-1 rounded-full bg-muted overflow-hidden`}>
                                    <div className={`absolute h-1 inset-0 rounded-full bg-cyan-500 ${levelPassword > 2 ? 'translate-x-0' : '-translate-x-full'} transition-all duration-150`}></div>
                                </div>
                            </div>
                            <span className={`
                                text-sm
                                ${levelPassword === 0 && 'text-muted-foreground'}
                                ${levelPassword === 1 && 'text-red-500'}
                                ${levelPassword === 2 && 'text-yellow-500'}
                                ${levelPassword === 3 && 'text-cyan-500'}
                            `}>
                                {levelPassword === 0 && 'Weak'}
                                {levelPassword === 1 && 'Too weak'}
                                {levelPassword === 2 && 'Could be stronger'}
                                {levelPassword === 3 && 'Strong password'}
                            </span>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="confirm_password">Confirm password</Label>
                        <Input id="confirm_password" type="password" value={data.confirm_password} onChange={e => setData({...data, confirm_password: e.target.value})} />
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="flex flex-col items-start justify-center gap-2 w-full">
                        <Button disabled={isPending} className="w-full">
                            {isPending && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}{" "}
                            Create account
                        </Button>
                        <span className={`text-sm text-muted-foreground`}>Already have an account? <Link href={'/auth/login'} className={'text-primary underline'}>Login</Link></span>
                    </div>
                </CardFooter>
            </Card>
        </form>
    )
}