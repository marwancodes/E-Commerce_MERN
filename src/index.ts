import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import userRoute from './routes/user.route';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());


app.use('/user', userRoute);

// Runnig the server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    connectDB();
}); 
