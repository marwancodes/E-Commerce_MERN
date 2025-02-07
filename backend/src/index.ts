import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import userRoute from './routes/user.route';
import productRoute from './routes/product.route';
import cartRoute from './routes/cart.route'
import { seedInitialProducts } from './services/productService';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

//seed the products to the database
seedInitialProducts(); // this function we use it to add some products to the database in case it is empty


// Routes
app.use('/user', userRoute);
app.use('/product', productRoute);
app.use('/cart', cartRoute);

// Runnig the server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    connectDB();
}); 
