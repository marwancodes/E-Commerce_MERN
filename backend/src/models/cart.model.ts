import mongoose, { Document, ObjectId, Schema} from "mongoose";
import { IProduct } from "./product.model";

const CartStatusEnum = ["active", "completed"]; 

export interface ICartItem { // this interface to make new rules and types for the cart item
    product: IProduct;
    unitPrice: number;
    quantity: number;
}

export interface ICart extends Document { // this interface to make new rules and types for the cart
    userId: ObjectId | string; // this is the user id
    items: ICartItem[];
    totalAmount: number;
    status: "active" | "completed";
}

const cartItemSchema = new Schema<ICartItem>({ // this is the schema for the cart item
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true }, // this is the product id
    quantity: { type: Number, required: true, default: 1 }, 
    unitPrice: { type: Number, required: true } 
})


const cartSchema = new Schema<ICart>({ // this is the schema for the cart
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // this is the user id
    items: [cartItemSchema], // this is the product id
    totalAmount: { type: Number, required: true}, // this is the total amount of the cart
    status: { type: String, enum: CartStatusEnum, default: "active" } // this is the status of the cart
})

export const cartModel = mongoose.model<ICart>('Cart', cartSchema); // this is the cart model