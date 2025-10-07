"use server";

import { addCategorySchema } from "@/validations/category";
import { revalidatePath } from "next/cache";

// ------------------------------- Get all categories ----------
export const getAllCategories = async () => {
    const res = await fetch(`${process.env.BASE_URL_DBS}/api/category/list`);
    return res.json();
};

// ------------------------------- Delete One Category ----------
export const deleteCategory = async (id: string, token: string) => {
    const res = await fetch(`${process.env.BASE_URL_DBS}/api/category/delete/${id}`, {
        method: "DELETE",
        headers: {
            "token": token
        }
    });

    if (res.ok) {
        // revalidate path
        revalidatePath("/categories");

        return res.json();
    } else {
        return res.json();
    }
}


// ---------------------------------Add Category---------
export const addCategory = async (token: string, prevState: unknown, formData: FormData) => {

    // Validations
    const result = addCategorySchema().safeParse(
        Object.fromEntries(formData.entries())
    );

    if (result.success === false) {
        return {
            status: 400,
            error: result.error.flatten().fieldErrors,
            values: Object.fromEntries(formData.entries())
        }
    }

    try {
        const res = await fetch(`${process.env.BASE_URL_DBS}/api/category/add`, {
            method: "POST",
            headers: {
                "token": token
            },
            body: formData
        });
        const data = await res.json();
        console.log(data)

        if (res.status === 400) {
            return {
                status: res.status,
                message: data.error as string,
            }
        }

        revalidatePath("/categories");
        revalidatePath("/");
        return {
            status: res.status,
            message: data.message as string,
        }
    } catch (error) {
        console.log('error--------<', error)
        return {
            status: 500,
            message: "Internal Server Error",
            values: null,
        }
    }
}