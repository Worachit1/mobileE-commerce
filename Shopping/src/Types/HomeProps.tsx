export interface ProductListParams {
    _id: string;
    images: [string];
    name: string;
    price: number;
    oldPrice?: number;
    inStock?: boolean;
    color?: string;
    size?: string;
    description?: string;
    quantity: number;
}

export interface FetchProductsParam {
    data: { result: any; };
    Products: ProductListParams[]; 
    result : ProductListParams[]; 
}

export interface UserParam {
    firstName:string;
    lastName:string;
    email:string;
    mobileNo:string;
}

