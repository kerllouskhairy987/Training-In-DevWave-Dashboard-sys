"use client";

import { TCategoryDeleteResponse } from "@/app/categories/_types";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { buttonVariants } from "@/components/ui/button"
import { ErrorMes } from "@/messages/ErrorMes";
import { SuccessMes } from "@/messages/SuccessMes";
import { deleteProduct } from "../_actions/products";

type TProps = {
    id: string;
    children: React.ReactNode;
}

export function DeleteProductDemo({ children, id }: TProps) {
    console.log('id ----------', id)

    const handleDeleteProduct = async (id: string) => {
        const deleteProductRes: TCategoryDeleteResponse =
            await deleteProduct(id, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZTQxOTJhNmIxMzk1OWY4OGUwMWFhMCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1OTc3OTExNX0.0VlxD5w_k9vRwzFOMx1BSm6Eu0qwAH-yf2lnJcUETPQ");

        if (deleteProductRes.success === false) {
            ErrorMes({ message: deleteProductRes.message })
            return;
        }
        SuccessMes({ message: "Product Deleted Successfully!" })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => handleDeleteProduct(id)}
                        className={buttonVariants({ variant: "destructive" })}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
