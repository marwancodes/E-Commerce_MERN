import mongoose, { Document, Schema } from 'mongoose';


export interface IUser extends Document { // this interface to make new rules and types for the user
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

export const userModel = mongoose.model<IUser>('User', userSchema); /* ('TableName in data base', userSchema) */