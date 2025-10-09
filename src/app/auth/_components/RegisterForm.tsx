"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useActionState, useEffect, useState } from "react";
import { registerAdmin } from "../_actions/auth";
import { ErrorMes } from "@/messages/ErrorMes";
import { SuccessMes } from "@/messages/SuccessMes";
import { redirect } from "next/navigation";
import Link from "next/link";
import { DropdownSelect } from "@/components/DropdownSelect";

type TInitialState = {
    status?: number | null,
    error?: {
        name?: string[] | undefined;
        email?: string[] | undefined;
        password?: string[] | undefined;
    } | null,
    message?: string,
    values?: { [k: string]: FormDataEntryValue } | null
}



const RegisterForm = () => {
    const initialState: TInitialState = {
        status: null,
        error: null,
        message: "",
        values: null
    }

    const [selectedRole, setSelectedRole] = useState("user");
    console.log('first', selectedRole)
    const [state, action, pending] = useActionState(registerAdmin, initialState);

    console.log('state-----==', state)
    useEffect(() => {
        if ((state.status === 400 || state.status === 500) && state.message && !pending) {
            ErrorMes({ message: state.message })
        }
        if ((state.status === 201 || state.status === 200) && state.message && !pending) {
            SuccessMes({ message: state.message })

            if (state.user.role === "admin") {
                redirect("/dashboard")
            } else {
                redirect("/home")
            }
        }
    }, [state.success, state.message, state.status, pending])

    return (
        <>
            <form action={action} className="flex flex-col justify-center gap-4 p-4 bg-accent-foreground rounded-lg">
                <h2 className="font-bold text-2xl text-white text-center">Register</h2>
                <Label className="font-semibold text-lg text-white flex flex-col items-start" htmlFor="name">Name
                    <Input id="name" name="name" placeholder="Enter Your Name..."
                        defaultValue={state.values?.name.toString() || ""} className="" />
                    {
                        state.error &&
                        <p className="text-red-500 text-sm">{state.error["name"]}</p>
                    }
                </Label>

                <Label className="font-semibold text-lg text-white flex flex-col items-start" htmlFor="email">Email
                    <Input id="email" name="email" placeholder="Enter Your Email..."
                        defaultValue={state.values?.email.toString() || ""} className="" />
                    {
                        state.error &&
                        <p className="text-red-500 text-sm">{state.error["email"]}</p>
                    }
                </Label>

                <Label className="font-semibold text-lg text-white flex flex-col items-start" htmlFor="password">Password
                    <Input id="password" name="password" placeholder="Enter Your Password..."
                        defaultValue={state.values?.password.toString() || ""} className="" />
                    {
                        state.error &&
                        <p className="text-red-500 text-sm">{state.error["password"]}</p>
                    }
                </Label>

                {/* Role Of User */}
                <div>
                    <div className="grid gap-3 text-white">
                        <Label className="font-semibold text-lg text-white flex flex-col items-start" htmlFor="role">Role</Label>
                        <DropdownSelect title="Role" placeholder="Select a role" selectors={[{ name: "user" }, { name: "admin" }]} setSelector={setSelectedRole} />
                        <Input
                            id="role"
                            name="role"
                            type="text"
                            // defaultValue={selectedRole}
                            value={!selectedRole ? "user" : selectedRole}
                            readOnly
                            className="" />
                    </div>
                    {
                        state.error &&
                        <p className="text-red-500 text-sm">{state.error["role"]}</p>
                    }
                </div>

                {
                    pending
                        ? <Button type="button" disabled >loading...</Button>
                        : <Button type="submit" variant={"secondary"} className="mt-5">Register</Button>
                }

            </form>

            <p className="text-center font-semibold mt-3">Already have an account? <Link href={"/auth/login"} className="text-blue-600">Login</Link></p>
        </>
    )
}

export default RegisterForm