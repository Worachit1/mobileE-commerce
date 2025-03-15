import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import { ProductListParams,  CartItem, CartState} from '../Types/productCartTypes';

export const CartSlice = createSlice ({
    name:'cart',
    initialState:{
        cart:[],
    },
    reducers:{
        addToCart:(state:CartItem, action:PayloadAction<ProductListParams>)=>{
            const itemPresent = state.cart.find((item)=> item._id === action.payload._id);

            if(!itemPresent){
                state.cart.push({...action.payload, quantity:1});
            }
        },
        removeFromCart:(state:CartItem, action:PayloadAction<ProductListParams>)=>{
            const removeItem = state.cart.filter((item)=> item._id !== action.payload._id);
            state.cart = removeItem
        },
        increaseQuantity:(state:CartItem, action:PayloadAction<ProductListParams>)=>{
            const result = state.cart.find((item)=> item._id === action.payload._id);

            if(result){
                result.quantity++
            }
        },
        decreaseQuantity:(state:CartItem, action:PayloadAction<ProductListParams>)=>{
            const getItem = state.cart.find((item)=> item._id === action.payload._id);

            if(getItem){
                getItem.quantity--
            }
        },
        emptyCart: (state)=>{
            state.cart=[];
        }  

    }
})

export const {addToCart, removeFromCart, increaseQuantity, decreaseQuantity, emptyCart} = CartSlice.actions

export default CartSlice.reducer;