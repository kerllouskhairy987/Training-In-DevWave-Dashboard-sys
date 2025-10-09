"use client";

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useActionState, useEffect } from 'react'
import { loginAction } from '../_actions/auth';
import { ErrorMes } from '@/messages/ErrorMes';
import { SuccessMes } from '@/messages/SuccessMes';
import { redirect } from 'next/navigation';

type TInitialState = {
    status: number | null,
    error: {
        email?: string[] | undefined;
        password?: string[] | undefined;
    } | null,
    message: string | null,
    values: { [k: string]: FormDataEntryValue } | null
}
const LoginForm = () => {
    const initialState: TInitialState = {
        status: null,
        error: null,
        message: null,
        values: null
    }
    const [state, action, pending] = useActionState(loginAction, initialState);
    console.log('first0000000000000', state)

    useEffect(() => {
        if ((state.success === false || state.status === 400 || state.status === 500) && state.message && !pending) {
            ErrorMes({ message: state.message })
        }
        if ((state.success === true || state.status === 200) && state.message && !pending) {
            SuccessMes({ message: state.message })
            if (state.role === "admin") {
                redirect("/dashboard")
            } else {
                redirect("/home")
            }
        }
    }, [state.success, state.message, state.status, pending])

    return (
        <form action={action} className="flex flex-col justify-center gap-4 p-4 bg-accent-foreground rounded-lg">
            <h2 className="font-bold text-2xl text-white text-center">Login</h2>

            <Label className="font-semibold text-lg text-white flex flex-col items-start" htmlFor="email">Email
                <Input id="email" name="email" placeholder="Enter Your Email..."
                    defaultValue={state.values?.email || ""} className="" />
                {
                    state.error &&
                    <p className="text-red-500 text-sm">{state.error["email"]}</p>
                }
            </Label>

            <Label className="font-semibold text-lg text-white flex flex-col items-start" htmlFor="password">Password
                <Input id="password" name="password" placeholder="Enter Your Password..."
                    defaultValue={state.values?.password || ""} className="" />
                {
                    state.error &&
                    <p className="text-red-500 text-sm">{state.error["password"]}</p>
                }
            </Label>

            {
                pending
                    ? <Button type="button" disabled variant={"secondary"} className="mt-5">loading...</Button>
                    : <Button type="submit" variant={"secondary"} className="mt-5">Register</Button>
            }

        </form>
    )
}

export default LoginForm