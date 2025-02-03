import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model";
import { ExtendRequest } from "../types/extendedRequest";


const validateJWT = (req: ExtendRequest, res: Response, next: NextFunction) => {
    const authorizationHeader = req.get('Authorization');

    if (!authorizationHeader) {
        res.status(401).send("Authorization header was not provided");
        return;
    }

    const token = authorizationHeader.split(' ')[1]; // the first part is Bearer and the second part is the token before the space
    if (!token) {
        res.status(401).send("Bearer token was not provided");
        return;
    }

    // Verify the token
    jwt.verify(token, process.env.SECRET_KEY as string, async (err, payload) => {
        if (err) {
            res.status(401).send("Invalid token");
            return;
        }

        if (!payload) {
            res.status(401).send("Invalid token payload");
            return;
        }

        const userPayload = payload as any;

        // Fetch the user from the database based on the payload
        const user = await userModel.findOne({ email: userPayload.email });
        req.user = user;
        next();
    });
}

export default validateJWT;