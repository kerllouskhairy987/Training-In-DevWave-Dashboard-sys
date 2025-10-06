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
import { useActionState, useEffect, useState } from "react";
import { addProduct } from "../_actions/products";
import { TCategory } from "@/app/categories/_types";
import { SelectCategory } from "./SelectCategory";
import { SuccessMes } from "@/messages/SuccessMes";
import { ErrorMes } from "@/messages/ErrorMes";

type TProps = {
    children: React.ReactNode;
    categories: TCategory[]
}

type InitialState = {
    status?: number | null,
    error?: {
        name?: string[] | undefined,
        description?: string[] | undefined,
        category?: string[] | undefined,
        price?: string[] | undefined,
        image?: string[] | undefined,
    } | null,
    message?: string,
    values?: { [k: string]: FormDataEntryValue } | null
}

const initialState: InitialState = {
    status: null,
    error: null,
    message: "",
    values: null
}


const DialogModalAddProduct = ({ children, categories }: TProps) => {
    const [getSelectedCategory, setGetSelectedCategory] = useState(categories[0].name);
    console.log("first", getSelectedCategory)

    const [state, action, pending] = useActionState(addProduct.bind(null, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZTQxOTJhNmIxMzk1OWY4OGUwMWFhMCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1OTc3OTExNX0.0VlxD5w_k9vRwzFOMx1BSm6Eu0qwAH-yf2lnJcUETPQ"), initialState);
    console.log("state", state)

    useEffect(() => {
        if ((state.status === 200 || state.status === 201) && state.message && !pending) {
            SuccessMes({ message: state.message })
        }
        if ((state.status === 400 || state.status === 500 || state.status === 401 || state.status === 404 || state.status === 403) && state.message && !pending) {
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
                    <DialogTitle>Add Product</DialogTitle>
                    <DialogDescription>
                        You Can Add New Product
                    </DialogDescription>
                </DialogHeader>
                <form action={action}>
                    <div className="grid gap-4">
                        {/* Image */}
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

                        {/* Name */}
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

                        {/* Description */}
                        <div>
                            <div className="grid gap-3">
                                <Label htmlFor="description">Description</Label>
                                <Input
                                    id="description"
                                    name="description"
                                    defaultValue={state?.values?.description as string || ""}
                                    placeholder="Enter description" />
                            </div>
                            {
                                state.error &&
                                <p className="text-red-500 text-sm">{state.error["description"]}</p>
                            }
                        </div>

                        {/* Price */}
                        <div>
                            <div className="grid gap-3">
                                <Label htmlFor="price">Price</Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    defaultValue={state?.values?.price as string || ""}
                                    placeholder="Enter price" />
                            </div>
                            {
                                state.error &&
                                <p className="text-red-500 text-sm">{state.error["price"]}</p>
                            }
                        </div>

                        {/* Category */}
                        <div>
                            <div className="grid gap-3">
                                <Label htmlFor="category">Category</Label>
                                <SelectCategory selectors={categories} setGetSelectedCategory={setGetSelectedCategory} />
                                <Input
                                    id="category"
                                    name="category"
                                    type="text"
                                    defaultValue={getSelectedCategory}
                                    value={getSelectedCategory}
                                    readOnly
                                    className="" />
                            </div>
                            {
                                state.error &&
                                <p className="text-red-500 text-sm">{state.error["category"]}</p>
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

export default DialogModalAddProduct