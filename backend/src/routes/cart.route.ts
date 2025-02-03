import express from 'express';
import { addItemToCart, checkout, cleanCart, deleteItemFromCart, getActiveCartForUser, updateItemInCart } from '../services/cartService';
import validateJWT from '../middlewares/validateJWT';
import { ExtendRequest } from '../types/extendedRequest'

const router = express.Router();

// Endpoints for the cart

router.get('/', validateJWT, async(req: ExtendRequest, res) => {
    try {
        const userId = req.user?._id;
        //TODO: get the userId from JWT after validating from the middleware.
        const cart = await getActiveCartForUser({ userId });
        res.status(200).send(cart);
    } catch (error) {
        res.status(500).send("Something went wrong!!");
    }
});


router.post('/items', validateJWT, async (req: ExtendRequest, res) => {
    try {
        const userId = req.user?._id; // TODO: get the userId from JWT after validating from the middleware.
        const { productId, quantity } = req.body; // get the productId and quantity from the request body
        const response = await addItemToCart({ userId, productId, quantity }); // call the addItemToCart function from the cartService
        res.status(response.statusCode).send(response.data);
    } catch (error) {
        res.status(500).send("Something went wrong!!"); 
    }
});

router.put('/items', validateJWT, async (req: ExtendRequest, res) => {
    try {
        const userId = req.user?._id; //TODO: get the userId from JWT after validating from the middleware.
        const { productId, quantity } = req.body; // get the productId and quantity from the request body
        const response = await updateItemInCart({ userId, productId, quantity });
        res.status(response.statusCode).send(response.data);
    } catch (error) {
        res.status(500).send("Something went wrong!!");
    }
});

router.delete('/items/:productId', validateJWT, async (req: ExtendRequest, res) => {
    try {
        const userId = req.user?._id; //TODO: get the userId from JWT after validating from the middleware.
        const { productId } = req.params; // get the productId from the request params
        const response = await deleteItemFromCart({ userId, productId });
        res.status(response.statusCode).send(response.data);
    } catch (error) {
        res.status(500).send("Something went wrong!!");
    }
});

router.delete('/', validateJWT, async (req: ExtendRequest, res) => {
    try {
        const userId = req.user?._id;
        const response = await cleanCart({ userId });
        res.status(response.statusCode).send(response.data);
    } catch (error) {
        res.status(500).send("Something went wrong!!");
    }
});

// Checkout endpoint
router.post('/checkout', validateJWT, async (req: ExtendRequest, res) => {
    try {
        const userId = req.user?._id;
        const { address } = req.body; // get the address from the request body
        const response = await checkout({ userId, address }); // call the checkout function from the cartService
        res.status(response.statusCode).send(response.data);
    } catch (error) {
        res.status(500).send("Something went wrong!!");
    }
});

export default router;