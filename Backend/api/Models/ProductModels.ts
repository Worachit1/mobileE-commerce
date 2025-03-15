import mongoose ,{Schema} from "mongoose";

import { ProductsParams } from "../dto/Product";

const ProductSchema = new Schema({
    name: {
        type:String,
        required: true,
    },
    images: {
        type:[String],
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
    },
    oldPrice: {
        type: Number
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
        max: 700
    },
    category: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'categories'
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    instock: {
        type:Boolean,
        default: true
    },
    businessId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Business'
    }
},
{
    
    toJSON: {
        transform(doc, ret) {
            delete ret. __V
            delete ret.createAt;
            delete ret.updateAt;
        }
    },
    timestamps: true
    
}
)

const PRODUCTS = mongoose.model<ProductsParams>('products', ProductSchema)

export {PRODUCTS}