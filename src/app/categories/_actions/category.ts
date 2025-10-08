"use server";

import { addCategorySchema } from "@/validations/category";
import { revalidatePath } from "next/cache";

// ------------------------------- Get all categories ----------
export const getAllCategories = async () => {
    const res = await fetch(`${process.env.BASE_URL_DBS}/api/category/list`);
    return res.json();
};

//--------------------------------Update Single Category----------
export const updateSingleCategory = async (args: {id: string, token: string}, prevState: unknown, formData: FormData) => {

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

    const res = await fetch(`${process.env.BASE_URL_DBS}/api/category/update/${args.id}`, {
        method: "PUT",
        headers: {
            "token": args.token
        }
    })
    const data = await res.json()
    console.log('datatatata', data)
    return data;
}

// ------------------------------- Delete One Category ----------
export const deleteCategory = async (id: string, token: string) => {
    const res = await fetch(`${process.env.BASE_URL_DBS}/api/category/delete/${id}`, {
        method: "DELETE",
        headers: {
            "token": token
        }
    });

    const data = await res.json();
    console.log('delete category', data)

    if (data.success === false || !res.ok || res.status !== 200) {
        return {
            status: 400,
            message: data.error as string || data.message as string,
        }
    }

    if (res.ok) {
        revalidatePath("/categories");
        revalidatePath("/");
        console.log('-------*************', data)
        return data;
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

        if (data.success === false || !res.ok || res.status === 400) {
            return {
                status: 400,
                message: data.error as string || data.message as string,
            }
        }

        if (res.ok) {
            revalidatePath("/categories");
            revalidatePath("/");
        }

        return {
            status: 200,
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