"use server";

import { addProductSchema, updateProductSchema } from "@/validations/product";
import { revalidatePath } from "next/cache";

// ------------------------Get All Products------------
export const getAllProducts = async () => {
    const res = await fetch(`${process.env.BASE_URL_DBS}/api/food/list`);
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
        // console.log(data)

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
            message: data.message,
        }
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Internal Server Error",
        }
    }
}

// ---------------------------Update Product----------------
export const updateProduct = async (args: { token: string, id: string }, prevState: unknown, formData: FormData) => {
    // Validations
    const result = updateProductSchema().safeParse(
        Object.fromEntries(formData.entries())
    );

    if (result.success === false) {
        return {
            status: 400,
            error: result.error.flatten().fieldErrors,
        }
    }

    try {
        // 🧩 إنشاء FormData جديدة
        const newFormData = new FormData();

        // 🧠 نلف على كل المفاتيح ونتأكد هل الصورة فيها ملف ولا لأ
        for (const [key, value] of formData.entries()) {
            if (key === "image") {
                const file = value as File;

                // ✅ لو المستخدم فعلاً رفع صورة جديدة
                if (file && file.size > 0) {
                    newFormData.append("image", file);
                }
                // ❌ غير كده متضيفش الصورة أصلاً
            } else {
                newFormData.append(key, value);
            }
        }


        const res = await fetch(`${process.env.BASE_URL_DBS}/api/food/update/${args.id}`, {
            method: "PUT",
            headers: {
                "token": args.token
            },
            body: newFormData
        });
        const data = await res.json()

        if (!res.ok) {
            return {
                status: 404,
                message: data.error as string
            }
        }

        // revalidate Path
        revalidatePath("/menu");
        revalidatePath("/");

        return {
            status: 200,
            message: data.message as string
        }

    } catch (error) {
        console.log(error)
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
    // console.log(res)

    return res.json();
}