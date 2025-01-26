import express from 'express';
import { addItemToCart, getActiveCartForUser } from '../services/cartService';
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
    const userId = req.user?._id;
    const { productId, quantity } = req.body;
    const response = await addItemToCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
})


export default router;