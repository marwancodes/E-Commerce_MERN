import express from 'express';
import { getActiveCartForUser } from '../services/cartService';

const router = express.Router();

router.get('/', async(req, res) => {
    try {
        //TODO: get the userId from JWT after validating from the middleware.
        const cart = await getActiveCartForUser({ userId: "333" });
        res.status(200).send(cart);
    } catch (error) {
        res.status(500).send("Something went wrong!!");
    }
})


export default router;