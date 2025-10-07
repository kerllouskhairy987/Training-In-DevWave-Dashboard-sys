"use server";

import { addProductSchema } from "@/validations/product";
import { revalidatePath } from "next/cache";

// ------------------------Get All Products------------
export const getAllProducts = async () => {
    const res = await fetch(`${process.env.BASE_URL_DBS}/api/food/list`);
    console.log(res)
    return res.json();
}

// --------------------------------Get Single Product-----------
export const getSingleProduct = async (id: string) => {
    const res = await fetch(`${process.env.BASE_URL_DBS}/api/food/single/${id}`)
    return res.json()
}

// ------------------------------- Get all categories ----------
export const getAllCategories = async () => {
    const res = await fetch(`${process.env.BASE_URL_DBS}/api/category/list`);
    return res.json();
};

// ----------------Create A Product-----------------
export const addProduct = async (token: string, prevState: unknown, formData: FormData) => {

    // Validations
    const result = addProductSchema().safeParse(
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
        const res = await fetch(`${process.env.BASE_URL_DBS}/api/food/add`, {
            method: "POST",
            headers: {
                "token": token
            },
            body: formData
        });
        const data = await res.json();
        console.log(data)

        if (!res.ok) {
            return {
                status: res.status,
                error: data.error,
                message: data.error
            }
        }

        if (res.status === 400) {
            return {
                status: res.status,
                error: data.error,
                message: data.error
            }
        }

        revalidatePath("/menu");
        revalidatePath("/");
        return {
            status: res.status,
            message: data.message
        }
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Internal Server Error"
        }
    }
}

//-------------------------------Delete Product----------------
export const deleteProduct = async (id: string, token: string) => {
    const res = await fetch(`${process.env.BASE_URL_DBS}/api/food/remove/${id}`, {
        method: "DELETE",
        headers: {
            "token": token
        }
    });
    revalidatePath("/menu");
    revalidatePath("/");
    console.log(res)

    return res.json();
}