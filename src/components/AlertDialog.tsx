"use client";

import { deleteCategory } from "@/app/categories/_actions/category";
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

type TProps = {
    id: string;
    children: React.ReactNode;
}

export function AlertDialogDelete({ children, id }: TProps) {

    const handleDeleteCategory = async (id: string) => {
        const deleteCategoryRes: TCategoryDeleteResponse =
            await deleteCategory(id, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZTZkOTgyYTAyZTdlYTVlYTE2MjJiZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1OTk1OTQ1N30.XWrU8c0-ZQdhKPV6cHg6rgjWZAlrPW0nSQh8G39cWI8");
        if (deleteCategoryRes.success === false) {
            ErrorMes({ message: deleteCategoryRes.message })
        }
        SuccessMes({ message: deleteCategoryRes.message })
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
                        onClick={() => handleDeleteCategory(id)}
                        className={buttonVariants({ variant: "destructive" })}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
