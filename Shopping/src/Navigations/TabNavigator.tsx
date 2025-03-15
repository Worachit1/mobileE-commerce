import React from "react";

import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {CompositeScreenProps} from '@react-navigation/native';

import { RootStackScreenProps } from "./RootNavigator";
import { Entypo, AntDesign, Ionicons, Feather } from "@expo/vector-icons";


import Homescreen from "../Screens/HomeScreens";
import CartScreen from "../Screens/CartScreen";
import DealScreen from "../Screens/DealScreen";
import ProfileScreen from "../Screens/ProfileScreen";
// import EditProfileScreen from "../Screens/EditProfileScreen";

// import AllProductsScreen from "../Screens/AllProductsScreen";

export type TabsStackParamsObj = {
    Home: undefined;
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
    deals: undefined;
    profile: undefined
}

const TabsStack = createBottomTabNavigator<TabsStackParamsObj>();

export type TabsStackScreenProps<T extends keyof TabsStackParamsObj> =
CompositeScreenProps<BottomTabScreenProps<TabsStackParamsObj, T>, RootStackScreenProps<"TabsStack">>;


const TabsNavigator = () => {

    return (
        <TabsStack.Navigator screenOptions={{tabBarShowLabel:false}}>
            <TabsStack.Screen name='Home' component={Homescreen} options={{headerShown:false, 
                tabBarIcon:({focused}) =>  focused ? (
                    <Entypo name="home" size={24} color='#008E97' />
                ):(
                    <AntDesign name="home" size={24} color='black' />
                ) 
                }} 
            />
            <TabsStack.Screen name='cart' component={CartScreen} options={{headerShown:false, 
                tabBarIcon:({focused}) =>  focused ? (
                    <Feather name="shopping-cart" size={24} color='#008E97' />
                ):(
                    <Feather name="shopping-cart" size={24} color='black' />
                ) 
                }} 
            />
             <TabsStack.Screen name='deals' component={DealScreen} options={{headerShown:false, 
                tabBarIcon:({focused}) =>  focused ? (
                    <Ionicons name="copy" size={24} color='#008E97' />
                ):(
                    <Ionicons name="copy-outline" size={24} color='black' />
                ) 
                }} 
            />
            <TabsStack.Screen name='profile' component={ProfileScreen} options={{headerShown:false, 
                tabBarIcon:({focused}) =>  focused ? (
                    <Ionicons name="person" size={24} color='#008E97' />
                ):(
                    <Ionicons name="person-outline" size={24} color='black' />
                ) 
                }} 
            />
            {/* <TabsStack.Screen name="EditProfile" component={EditProfileScreen} /> */}
        </TabsStack.Navigator>
        
    )
}

export default TabsNavigator;