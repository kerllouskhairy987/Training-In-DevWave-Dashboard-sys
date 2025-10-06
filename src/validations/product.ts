import z from "zod"

export const addProductSchema = () => {
    return z.object({
        name: z.string().min(1, {
            message: "Product name is required"
        }),
        description: z.string().min(1, {
            message: "Product description is required"
        }),
        category: z.string().min(1, {
            message: "Product category is required"
        }),
        price: z.string().min(1, {
            message: "Product price is required"
        }),

        image: z.file().min(1, {
            message: "Product image is required"
        })
    })
}