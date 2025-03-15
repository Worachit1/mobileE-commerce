

export type Cstep = number

export interface UserAddress {
    _id?:string;
    firstName?:string;
    lastName?:string;
    email?:string;
    mobileNo?:string;
    deliveryInfo?:string;
    region?:string;
    city?:string;
}

export interface userForm {
    data:{
        UserAddress:UserAddress[]
    }
}