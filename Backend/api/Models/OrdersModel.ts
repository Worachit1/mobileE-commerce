import mongoose, {Schema} from "mongoose";
import { ordersParams } from "../dto/Oders";


const OrdersSchema = new Schema ({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },

    Products: [
        {
            name: {
                type:String,
                required:true
            },
            quantity: {
                type:Number,
                required:true
            },
            price: {
                type:Number,
                required:true
            },
            images: [{
                type:String,
                required:true
            }],
        },
    ],

    totalPrice: {
        type: Number,
        require:true
    },
    shippingAddress: {
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        mobileNo:{
            type:String,
            required:true
        },
        deliveryInfo:{
            type:String,
            required:true
        },
        region:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
    },

    paymentMethod: {
        type:String,
        require:true
    },
    createAt:{
            type:Date,
            default:Date.now
        }
});


const ORDERSLOG = mongoose.model<ordersParams>('Oders', OrdersSchema)

export {ORDERSLOG}