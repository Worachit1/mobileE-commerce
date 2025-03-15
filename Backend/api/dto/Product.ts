export interface ProductsParams {


    name: string;
    images: [string];
    price: number;
    oldPrice: number;
    description: string;
    quantity: number;
    inStock: boolean;
    isFeatured : boolean
    category: string;
    businessId: string;

}

export interface ProductItem {
    name?: string;
    images?: [string];
    price?: number;
    oldPrice?: number;
    description?: string;
    quantity?: number;
    inStock?: boolean;
    isFeatured?: boolean
    category?: string;
    businessId: string;

}