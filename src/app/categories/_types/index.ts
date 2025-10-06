export type TCategory = {
    _id: string;
    name: string;
    image: string;
    __v: number;
}

export type TCategoryResponse = {
    success: boolean;
    categories: TCategory[];
}

export type TCategoryDeleteResponse = {
    success: boolean;
    message: string;
}