import { userAddressProps } from "./User";

export interface ProductItem {
    _id: string;
    name?: string;
    images?: [string];
    price?: number;
    quantity:number;
    inStock?: boolean;
    category: string;
    length?: number;

}

export interface CartItem{
    cart: ProductItem[];
}

export interface CartState {
    cart: {
        cart:ProductItem[];
        length:number
    }
}

export interface totalPrice {
    totalPrice:number;
}

export interface IPaymentMethod {
    shipping:string;
}

export interface ordersParams {
    userId: string;
    cartItem:ProductItem[];
    totalPrice:totalPrice;
    shippingAddress:userAddressProps
    paymentMethod:IPaymentMethod;
}