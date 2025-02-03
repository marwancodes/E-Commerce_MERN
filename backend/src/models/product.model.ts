import mongoose, { Document, Schema} from "mongoose";

export interface IProduct extends Document { // this interface to make new rules and types for the product
    title: string;
    image: string;
    price: number;
    stock: number;
}

const productSchema = new Schema<IProduct>({
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
})

export const productModel = mongoose.model<IProduct>('Product', productSchema);