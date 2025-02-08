import { userModel } from "../models/user.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


//************************************** Register ********************************************************************
interface RegisterParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export const register = async ({firstName, lastName, email, password}: RegisterParams) => {
    const findUser = await userModel.findOne({ email });

    if (findUser) {
        return {data: "User already exists", statusCode: 400};
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, 10); // hash the password

    const newUser = new userModel({ email, firstName, lastName, password: hashedPassword });
    await newUser.save();

    return { data: generateToken({ firstName, lastName, email }), statusCode: 200 };
}

//************************************** Login ********************************************************************
interface LoginParams {
    email: string;
    password: string;
}

export const login = async ({email, password}: LoginParams) => {
    const findUser = await userModel.findOne({ email });

    if (!findUser) {
        return {data: "Incorrect email or password!", statusCode: 400};
    }

    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if (passwordMatch) {
        return {
            data: generateToken({
                email, 
                firstName: findUser.firstName,
                lastName: findUser.lastName
            }),
            statusCode: 200
        };
    }

    return {data: "Incorrect email or password!", statusCode: 400}; 
}

//************************************** Generate Token ********************************************************************
const generateToken = (data: any) => {
    return jwt.sign(data, process.env.SECRET_KEY as string, { expiresIn: '24h' });
}