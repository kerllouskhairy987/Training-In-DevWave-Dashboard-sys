export interface Product {
    _id: string;
    name: string;
    image: string;
    price: number;
    description: string;
    category: string;
    __v: number;
}

export interface ProductsResponse {
    success: boolean;
    data: Product[];
}