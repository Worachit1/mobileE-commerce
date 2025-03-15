import mongoose, { Schema } from "mongoose";
import { businessModelParams } from "../dto/Businesser";


const businessSchema = new Schema ({
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
    createAt:{
        type:Date,
        default:Date.now
    }
});

const BUSINESSLOG = mongoose.model<businessModelParams>('Business', businessSchema)

export {BUSINESSLOG}