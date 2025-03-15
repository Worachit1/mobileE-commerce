export type OrderProduct = {
    name: string;
    quantity: number;
    price: number;
    images: string[];
    _id: string;
};

export type ShippingAddress = {
    firstName: string;
    lastName: string;
    email: string;
    mobileNo: string;
    deliveryInfo: string;
    region: string;
    city: string;
};

export type Order = {
    _id: string;
    shippingAddress: ShippingAddress;
    Products: OrderProduct[];
    totalPrice: number;
    paymentMethod: string;
    createAt: string;
};

// props สำหรับหน้า PurchaseHistory
export type PurchaseHistoryProps = {
    orders: Order[];
};