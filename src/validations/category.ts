import z from "zod"

export const addCategorySchema = () => {
    return z.object({
        name: z.string().min(1, {
            message: "Category name is required"
        }),
        image: z.file().min(1, {
            message: "Category image is required"
        })
    })
}