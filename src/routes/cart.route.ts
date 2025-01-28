import express from 'express';
import { addItemToCart, getActiveCartForUser, updateItemInCart } from '../services/cartService';
import validateJWT from '../middlewares/validateJWT';
import { ExtendRequest } from '../types/extendedRequest'

const router = express.Router();

router.get('/', validateJWT, async(req: ExtendRequest, res) => {
    const userId = req.user?._id;
    try {
        //TODO: get the userId from JWT after validating from the middleware.
        const cart = await getActiveCartForUser({ userId });
        res.status(200).send(cart);
    } catch (error) {
        res.status(500).send("Something went wrong!!");
    }
});

router.post('/items', validateJWT, async (req: ExtendRequest, res) => {
    const userId = req.user?._id; // TODO: get the userId from JWT after validating from the middleware.
    const { productId, quantity } = req.body; // get the productId and quantity from the request body
    const response = await addItemToCart({ userId, productId, quantity }); // call the addItemToCart function from the cartService
    res.status(response.statusCode).send(response.data);
});

router.put('/items', validateJWT, async (req: ExtendRequest, res) => {
    const userId = req.user?._id; //TODO: get the userId from JWT after validating from the middleware.
    const { productId, quantity } = req.body; // get the productId and quantity from the request body
    const response = await updateItemInCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
});


export default router;