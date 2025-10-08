export interface OrdersResponse {
    success: boolean;
    data: Order[];
}

export interface Order {
    _id: string;
    userId: string;
    address: string | Address;
    items: OrderItem[];
    amount: number;
    status: string;
    payment: boolean;
    date: string;
    createdAt?: string;
    updatedAt?: string;
    __v: number;
}

export interface Address {
    street: string;
    city: string;
    state: string;
    country: string;
    phone: string;
    zipCode?: string;
}

export interface OrderItem {
    _id?: string;
    name: string;
    price: number;
    quantity: number;
}
