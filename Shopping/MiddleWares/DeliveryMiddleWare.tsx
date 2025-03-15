import { Alert } from 'react-native'
import React, {} from 'react'
import axios from 'axios'
import { UserAddress, userForm } from '../src/Types/DeliveryProps';
import { ProductListParams } from '../src/Types/productCartTypes';
import { BASE_URL } from '../BASE_URL';


interface IGetAddressProps {
    setAddress: React.Dispatch<React.SetStateAction<UserAddress[]>>
    getUserId: string|null;

}

interface IPlaceOrderProps {
    orderObj:{
        userId:string|null;
        cartItem:ProductListParams[]
        totalPrice:number;
        shippingAddress: UserAddress;
        paymentMethod: string;
    }

}

export const fetchAddress = async ({ setAddress, getUserId }: IGetAddressProps) => {
    try {
        // console.log(`Fetching address for User ID: ${getUserId}`);
        const response:userForm = await axios.get(`${BASE_URL}/user/addresses/${getUserId}`);
        const {UserAddress} = response.data
        setAddress(UserAddress)
    } catch (err: any) {
        console.error("An error occurred: ", err.message);
    }
};

export const placeOrderByCash = async ({orderObj}: IPlaceOrderProps) => {
    try {
        
        const response = await axios.post(`${BASE_URL}/orders/`,orderObj);
        if(response.status === 200){
            Alert.alert('Order Placed Successfully!')
        }
    } catch (err: any) {
        console.error("An error occurred: ", err.message);
    }
};