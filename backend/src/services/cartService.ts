import { cartModel } from "../models/cart.model";
import { IOrderItem, orderModel } from "../models/order.model";
import { productModel } from "../models/product.model";

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
    populateProduct?: boolean;
}

export const getActiveCartForUser = async ({ userId, populateProduct }: GetActiveCartForUser) => { // this function to get the active cart for the user
    
    let cart ;
    if (populateProduct) {
        cart = await cartModel
            .findOne({ userId, status: "active" })
            .populate('items.product');
    } else {
        cart = await cartModel.findOne({ userId, status: "active" });
    }

    if (!cart) { // if there is no active cart for the user
        cart = await createCartForUser({ userId });
    }

    return cart;
}

//************************************** Add Item To Cart ********************************************************************
interface AddItemToCart {
    productId: any;
    quantity: number;
    userId: string;
}

export const addItemToCart = async ({ productId, quantity, userId }: AddItemToCart) => {
    const cart = await getActiveCartForUser({ userId });

    // Does the product already exist in the cart?
    const existsInCart = cart.items.find((p) => p.product.toString() === productId); 

    if (existsInCart) { 
        return { data: "Item already exists in cart!!", statusCode: 400 }
    }

    // Fetch the product from the database
    const product = await productModel.findById(productId);

    if (!product) {
        return { data: "Product not found!", statusCode: 400 };
    }

    // check stock for the product
    if (product.stock < quantity) {
        return { data: "Low stock for item", statusCode: 400 };
    }

    // Add the product to the cart
    cart.items.push({ product: productId, unitPrice: product.price, quantity });

    // update the totalAmount for the cart
    cart.totalAmount += product.price * quantity;

    await cart.save();

    return { data: await getActiveCartForUser({ userId, populateProduct: true}), statusCode: 200 };
}

//************************************** Update Item In Cart ********************************************************************
interface UpdateItemInCart {
    productId: any;
    quantity: number;
    userId: string;
}

export const updateItemInCart = async ({ productId, quantity, userId }: UpdateItemInCart) => {
    const cart = await getActiveCartForUser({ userId }); // get the active cart for the user

    // Does the product already exist in the cart?
    const existsInCart = cart.items.find((p) => p.product.toString() === productId); 

    if (!existsInCart) { 
        return { data: "Item does not exists in cart!!", statusCode: 400 }
    }

    // Fetch the product from the database
    const product = await productModel.findById(productId);

    // check if the product exists
    if (!product) {
        return { data: "Product not found!", statusCode: 400 };
    }

    // check stock for the product
    if (product.stock < quantity) {
        return { data: "Low stock for item", statusCode: 400 };
    }

    const otherCartItems = cart.items.filter((p) => p.product.toString() !== productId); // filter out the product that needs to be updated
    
    // calculate the total amount for the cart
    let total = otherCartItems.reduce((sum, product) => { // calculate the total amount for the cart
        sum += product.quantity * product.unitPrice;
        return sum;
    }, 0);
    
    existsInCart.quantity = quantity;
    total += existsInCart.quantity * existsInCart.unitPrice;
    cart.totalAmount = total; // update the total amount for the cart

    await cart.save();
    return { data: await getActiveCartForUser({ userId, populateProduct: true}), statusCode: 200 };    
}

//************************************** Delete Item From Cart ********************************************************************
interface DeleteItemFromCart {
    productId: any;
    userId: string;
}

export const deleteItemFromCart = async ({ productId, userId }: DeleteItemFromCart) => {
    const cart = await getActiveCartForUser({ userId }); // get the active cart for the user

    // Does the product already exist in the cart?
    const existsInCart = cart.items.find((p) => p.product.toString() === productId);

    if (!existsInCart) { 
        return { data: "Item does not exists in cart!!", statusCode: 400 }
    }

    const otherCartItems = cart.items.filter((p) => p.product.toString() !== productId); // filter out the product that needs to be updated
    
    // calculate the total amount for the cart
    let total = otherCartItems.reduce((sum, product) => { // calculate the total amount for the cart
        sum += product.quantity * product.unitPrice;
        return sum;
    }, 0);


    cart.items = otherCartItems; // update the items in the cart
    cart.totalAmount = total; // update the total amount for the cart


    await cart.save();
    return { data: await getActiveCartForUser({ userId, populateProduct: true}), statusCode: 200 };
}

//************************************** Clear Cart ********************************************************************
interface ClearCart {
    userId: string;
}

export const clearCart = async ({ userId }: ClearCart) => {
    const cart = await getActiveCartForUser({ userId }); // get the active cart for the user

    cart.items = []; // empty the items array
    cart.totalAmount = 0; // set the total amount to 0

    const updatedCart = await cart.save();
    return { data: await getActiveCartForUser({ userId, populateProduct: true}), statusCode: 200 };
}

//************************************** Checkout ********************************************************************
interface Checkout {
    userId: string;
    address: string;
}

export const checkout = async ({ userId, address }: Checkout) => {

    if (!address) {
        return { data: "Address is required!", statusCode: 400 };
    }

    const cart = await getActiveCartForUser({ userId }); // get the active cart for the user

    const orderItems: IOrderItem[] = [];

    // Loop cartItem and create orderItems
    for (const item of cart.items) {
        const product = await productModel.findById(item.product);

        if (!product) {
            return { data: "Product not found!", statusCode: 400 };
        }

        const orderItem: IOrderItem = {
            productTitle: product?.title,
            productImage: product?.image,
            quantity: item.quantity,
            unitPrice: item.unitPrice
        }

        orderItems.push(orderItem);
    }

    const order = await orderModel.create({
        orderItems,
        total: cart.totalAmount,
        address,
        userId
    })
    await order.save();
    
    // Update the cart status to completed
    cart.status = "completed";
    await cart.save();

    return { data: order, statusCode: 201 };
}