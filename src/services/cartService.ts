import { cartModel } from "../models/cart.model";

//************************************** Create Cart For User ********************************************************************
interface CreateCartForUser {
    userId: string;
}

const createCartForUser = async ({ userId }: CreateCartForUser) => { // this function to create a new cart for the user
    const cart = await cartModel.create({ userId, totalAmount: 0 });
    await cart.save();
    return cart;
}

//************************************** Get Active Cart For User ********************************************************************

interface GetActiveCartForUser {
    userId: string;
}

export const getActiveCartForUser = async ({ userId }: GetActiveCartForUser) => { // this function to get the active cart for the user
    
    let cart = await cartModel.findOne({ userId, status: "active" }); 

    if (!cart) { // if there is no active cart for the user
        cart = await createCartForUser({ userId });
    }

    return cart;
}