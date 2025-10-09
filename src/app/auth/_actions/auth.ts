"use server";

import { loginSchema, registerSchema } from "@/validations/auth";
import { revalidatePath } from "next/cache";

export const registerAdmin = async (prevState: unknown, formData: FormData) => {

    // validation
    const result = registerSchema().safeParse(
        Object.fromEntries(formData.entries())
    )

    if (result.success === false) {
        return {
            status: 400,
            values: Object.fromEntries(formData.entries()),
            error: result.error.flatten().fieldErrors,
        }
    }

    try {
        const res = await fetch(`${process.env.BASE_URL_DBS}/api/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: formData.get("name"),
                email: formData.get("email"),
                password: formData.get("password"),
                role: formData.get("role")
            })
        })

        revalidatePath("/auth/register");
        revalidatePath("/");

        return (
            res.json().then(data => {
                if (!res.ok) {
                    return {
                        status: res.status,
                        message: `${data.message}, use another email`,
                        values: Object.fromEntries(formData.entries())
                    }
                }
                return {
                    status: 200,
                    message: data.message as string,
                    ...data
                }
            })
        )
    } catch (error) {
        console.log(error)
        return {
            status: 400,
            message: error as string
        }
    }
}


// -------------------------------------Login Part-------------
export const loginAction = async (prevState: unknown, formData: FormData) => {
    // validations
    const result = loginSchema().safeParse(
        Object.fromEntries(formData.entries())
    )

    if (result.success === false) {
        return {
            status: 400,
            values: Object.fromEntries(formData.entries()),
            error: result.error.flatten().fieldErrors,
        }
    }

    try {
        const res = await fetch(`${process.env.BASE_URL_DBS}/api/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: formData.get("email"),
                password: formData.get("password")
            })
        })

        if (!res.ok) {
            return {
                status: 400,
                message: "invalid email or password",
                values: Object.fromEntries(formData.entries())
            }
        }

        revalidatePath("/")

        return (
            res.json().then(data => {
                console.log('data from login', data)
                return {
                    status: 200,
                    message: data.message as string,
                    ...data
                }
            })
        )
    } catch (error) {
        console.log(error)
        return {
            status: 500,
            message: "Internal Server Error"
        }
    }
}