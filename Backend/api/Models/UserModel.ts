import mongoose, { Schema } from "mongoose";
import { userModelParams } from "../dto/User";
//import {}


const userSchema = new Schema ({
    firstName: {
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    mobileNo:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    },
    userAddressInfo:[
        {
            firstName:String,
            lastName:String,
            email:String,
            mobileNo:String,
            deliveryInfo:String,
            region:String,
            city:String
        },
    ],
    orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Oders',
        }
    ],
    createAt:{
        type:Date,
        default:Date.now
    }
});

const USERLOG = mongoose.model<userModelParams>('Users', userSchema)

export {USERLOG}