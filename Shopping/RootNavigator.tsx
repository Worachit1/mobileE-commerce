import React from "react";
import {NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from "@react-navigation/native";
import TabsNavigator,{ TabsStackParamsObj } from "./TabNavigator";
import ProductDetails from "../Screens/ProductDetails";
import UserAuth from "../Screens/LogReg";
import DeliveryScreen from "../Screens/DeliveryScreen";
import AddAdress from "../Screens/AddressForm";
// import { CardPaymentMethod } from "../Components/DeliveryComponents/CardPaymentMethod";
// import PaymentSelectionScreen from "../Screens/PaymentSelectionScreen ";
import PurchaseHistoryScreen from "../Screens/PurchaseHistoryScreen";

export type RootStackParamObj ={
    TabsStack: NavigatorScreenParams<TabsStackParamsObj>
    Deals: undefined;
    // cart: undefined;

    productDetails :{
        _id: string;
        images: [string];
        name: string;
        price: number;
        oldPrice?: number;
        inStock?: boolean;
        storage?: string;
        size?: string;
        description?: string;
        quantity: number;
        screenTitle?:string;
    }

    cart: {
        _id?: string;
        images?: [string];
        name?: string;
        price?: number;
        oldPrice?: number;
        inStock?: boolean;
        description?: string;
        quantity?: number;
        screenTitle?:string;
    };

    UserLogin:{
        email?:string;
        password?:string;
        confirmPassword?:string;
        firstName?:string;
        lastName?:string;
        mobileNo?:string
        screenTitle?:string;
    };

    checkoutInfo:{
        _id?:string;
        email?:string;
        firstName?:string;
        lastName?:string;
        mobileNo?:string
        deliveryInfo?:string;
        region?:string;
        city?:string
        screenTitle?:string;
    };
    
    userAddress : {

        email?:string;
        firstName?:string;
        lastName?:string;
        mobileNo?:string
        deliveryInfo?:string;
        region?:string;
        city?:string
        screenTitle?:string;
    }
    purchaseHistory: {
        orders: {
            _id: string;
            user: string;
            shippingAddress: {
                firstName: string;
                lastName: string;
                email: string;
                mobileNo: string;
                deliveryInfo: string;
                region: string;
                city: string;
            };
            Products: {
                name: string;
                quantity: number;
                price: number;
                images: string[];
                _id: string;
            }[];
            totalPrice: number;
            paymentMethod: string;
            createAt: string;
        }[];
    };
    
    
}


const RootStack = createNativeStackNavigator<RootStackParamObj>();

export type RootStackScreenProps<T extends keyof RootStackParamObj> =
NativeStackScreenProps<RootStackParamObj, T>;

const RootNavigator = () => {

    return (
        <RootStack.Navigator>
            <RootStack.Screen name="TabsStack" component={TabsNavigator} options={{headerShown:false}}/>
            <RootStack.Screen name="productDetails" component={ProductDetails} options={{headerShown:false}}/>
            <RootStack.Screen name="UserLogin" component={UserAuth} options={{headerShown:false}}/>
            <RootStack.Screen name="checkoutInfo" component={DeliveryScreen} options={{headerShown:false}}/>
            <RootStack.Screen name="userAddress" component={AddAdress} options={{headerShown:false}}/>
            <RootStack.Screen name="purchaseHistory" component={PurchaseHistoryScreen} options={{ headerShown: false }} />
            {/* <RootStack.Screen name="CardPayment" component={CardPaymentMethod} options={{headerShown:false}}/>
            <RootStack.Screen name="PaymentSelection" component={PaymentSelectionScreen} options={{headerShown:false}}/> */}


        </RootStack.Navigator>
    )


}

export default RootNavigator;
