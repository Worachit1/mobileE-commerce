export interface businessModelParams {
    firstName:string;
    lastName:string;
    email:string;
    mobileNo:string;
    password:string;
    confirmPassword?:string;
    businessId?:string;
}

export interface businessLoginParams{
    email:string;
    password:string;
}