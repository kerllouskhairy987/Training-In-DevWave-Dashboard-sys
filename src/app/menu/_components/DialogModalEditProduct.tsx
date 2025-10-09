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
import { use, useActionState, useEffect, useState } from "react";
import { addProduct, getSingleProduct, updateProduct } from "../_actions/products";
import { TCategory } from "@/app/categories/_types";
import { DropdownSelect } from "../../../components/DropdownSelect";
import { SuccessMes } from "@/messages/SuccessMes";
import { ErrorMes } from "@/messages/ErrorMes";
import { Product, SingleProductResponse } from "../types";
import Image from "next/image";
import { Edit } from "lucide-react";

type TProps = {
    id: string;
    children: React.ReactNode;
    categories: TCategory[];
    // product: SingleProductResponse
}

type InitialState = {
    status?: number | null,
    error?: {
        name?: string[] | undefined;
        description?: string[] | undefined;
        category?: string[] | undefined;
        price?: string[] | undefined;
    } | null,
    message?: string,
}

const DialogModalEditProduct = ({ id, children, categories }: TProps) => {
    const [getSelectedCategory, setGetSelectedCategory] = useState(categories[0].name);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [prevDataProduct, setPrevDataProduct] = useState<Product>()
    const [open, setOpen] = useState(false);

    const initialState: InitialState = {
        status: null,
        error: null,
        message: "",
    }


    const [state, action, pending] = useActionState(updateProduct.bind(null, {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZTQxOTJhNmIxMzk1OWY4OGUwMWFhMCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1OTc3OTExNX0.0VlxD5w_k9vRwzFOMx1BSm6Eu0qwAH-yf2lnJcUETPQ",
        id
    }), initialState);
    console.log('state from client', state)

    useEffect(() => {
        if ((state.status === 200 || state.status === 201) && state.message && !pending) {
            SuccessMes({ message: state.message });
            setOpen(false); // 👈 يقفل الـ modal بعد النجاح
        }
        if ((state.status === 400 || state.status === 500 || state.status === 401 || state.status === 404 || state.status === 403) && state.message && !pending) {
            ErrorMes({ message: state.message })
        }
    }, [state.status, state.message, pending])


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild onClick={async () => {
                setIsLoading(true)
                try {
                    const res = await getSingleProduct(id)
                    setPrevDataProduct(res.data)

                } catch (error) {
                    setIsLoading(false)
                } finally {
                    setIsLoading(false)
                }
            }}>
                {isLoading
                    ? <Button type="button" disabled className="cursor-not-allowed">Loading ...</Button>
                    : children
                }
            </DialogTrigger>
            {
                !isLoading &&
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
                                    <div className="relative w-40 h-40 rounded-full border-2 ">
                                        <Input
                                            className="opacity-1 hidden"
                                            id="name-2"
                                            name="image"
                                            type="file"
                                        />
                                        {
                                            prevDataProduct?.image &&
                                            <Label htmlFor="name-2" className="cursor-pointer">
                                                <Image src={prevDataProduct?.image} alt={prevDataProduct.name}
                                                    fill
                                                    className="rounded-full object-cover object-center"
                                                />
                                                <Edit className="absolute z-10 bg-gray-500 p-1 bottom-0 right-0 text-white font-semibold rounded" />
                                            </Label>
                                        }
                                    </div>
                                </div>
                            </div>

                            {/* Name */}
                            <div>
                                <div className="grid gap-3">
                                    <Label htmlFor="name-1">Name</Label>
                                    <Input
                                        id="name-1"
                                        name="name"
                                        defaultValue={prevDataProduct?.name || ""}
                                        readOnly
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
                                        autoFocus
                                        id="description"
                                        name="description"
                                        defaultValue={prevDataProduct?.description || ""}
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
                                        defaultValue={prevDataProduct?.price || ""}
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
                                    <DropdownSelect selectors={categories} setSelector={setGetSelectedCategory} />
                                    <Input
                                        id="category"
                                        name="category"
                                        type="text"
                                        defaultValue={prevDataProduct?.category || ""}
                                        value={getSelectedCategory || prevDataProduct?.category}
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
                                    : <Button type="submit" >Update Product</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            }
        </Dialog>
    )
}

export default DialogModalEditProduct