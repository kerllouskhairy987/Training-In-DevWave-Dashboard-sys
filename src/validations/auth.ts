import z, { email } from "zod"

export const registerSchema = () =>  {
    return z.object({
        name: z.string().trim().min(1, {
            message: "Name is required"
        }),
        email: z.string().trim().email().min(1, {
            message: "Email is required"
        }),
        role: z.enum(["user", "admin"]).default("user"),
        password: z.string().trim().min(1).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
            message: "Password must be at least 8 characters long and contain at least one letter and one number"
        })
    })
}

export const loginSchema = () => {
    return z.object({
        email: z.string().trim().email().min(1, {
            message: "Email is required"
        }),
        password: z.string().trim().min(1, {
            message: "Password is required"
        })
    })
}