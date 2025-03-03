import express from 'express';
import { getMyOrders, login, register } from '../services/userService';
import validateJWT from '../middlewares/validateJWT';
import { ExtendRequest } from '../types/extendedRequest';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password} = req.body;
        console.log(req.body);
        const { statusCode, data} = await register({ firstName, lastName, email, password });
        res.status(statusCode).json(data);
    } catch (error) {
        res.status(500).send("Something went wrong!!");
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password} = req.body;
        const { statusCode, data} = await login({ email, password });
        res.status(statusCode).json(data);
    } catch (error) {
        res.status(500).send("Something went wrong!!");
    }
});

router.get('/my-orders', validateJWT, async (req: ExtendRequest, res) => {
    try {
        const userId = req?.user?._id;
        const { statusCode, data } = await getMyOrders({ userId });
        res.status(statusCode).send(data);
    } catch (error) {
        res.status(500).send("Something went wrong!");
    }
});


export default router;