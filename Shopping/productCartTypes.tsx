export interface ProductListParams {
    _id: string;
    images: [string];
    name: string;
    quantity: number;
    category?: string;
    price: number;
    oldPrice?: number;
    inStock?: boolean;
    color?: string;
    size?: string;
    description?: string;
    
}

export interface CartItem {
    cart:ProductListParams[]
}

export interface CartState {
    cart: {
        cart:ProductListParams[]
        length:number
    }
}
