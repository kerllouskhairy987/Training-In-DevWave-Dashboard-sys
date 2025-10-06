"use client";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useActionState, useEffect } from "react";
import { addCategory } from "../_actions/category";
import { SuccessMes } from "@/messages/SuccessMes";
import { ErrorMes } from "@/messages/ErrorMes";

type TProps = {
    children: React.ReactNode;
}
type InitialState = {
    status?: number | null,
    error?: {
        name?: string[] | undefined,
        image?: string[] | undefined,
    } | null,
    message?: string | null,
    values?: { [k: string]: FormDataEntryValue } | null
}

const initialState: InitialState = {
    status: null,
    error: null,
    message: null,
    values: null
}

export function DialogModalAdd({ children }: TProps) {

    const [state, action, pending] = useActionState(addCategory.bind(null, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDQ0MjNlYmM5MDA2YmZkN2QyZDc5YSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU5Nzc1MzMyfQ.3gHSdcAvIx_KavDUruobeAE0REl6S0nv8rBlF_mMYR0"), initialState)

    useEffect(() => {
        if ((state.status === 200 || state.status === 201) && state.message && !pending) {
            SuccessMes({ message: state.message })
        }
        if ((state.status === 400 || state.status === 500 || state.status === 401) && state.message && !pending) {
            ErrorMes({ message: state.message })
        }
    }, [state.status])

    return (
        <Dialog>
            <DialogTrigger asChild onClick={() => console.log("id")}>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Category</DialogTitle>
                    <DialogDescription>
                        You Can Add New Category
                    </DialogDescription>
                </DialogHeader>
                <form action={action}>
                    <div className="grid gap-4">
                        <div>
                            <div className="grid gap-3">
                                <Label htmlFor="name-2">Image</Label>
                                <div className="w-48 h-48 rounded-full border-2">
                                    <Input className="opacity-0 w-48 h-48 rounded-full border-2"
                                        id="name-2" name="image" type="file"
                                    />
                                </div>
                            </div>
                            {
                                state.error &&
                                <p className="text-red-500 text-sm">{state.error["image"]}</p>
                            }
                        </div>

                        <div>
                            <div className="grid gap-3">
                                <Label htmlFor="name-1">Name</Label>
                                <Input
                                    id="name-1"
                                    name="name"
                                    defaultValue={state?.values?.name as string || ""}
                                    placeholder="Enter category name" />
                            </div>
                            {
                                state.error &&
                                <p className="text-red-500 text-sm">{state.error["name"]}</p>
                            }
                        </div>
                    </div>
                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        {
                            pending
                                ? <Button type="button" disabled >loading...</Button>
                                : <Button type="submit" >Add Category</Button>
                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
