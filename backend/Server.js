import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import connectCloudinary from './config/cloudinary.js';
import connectDB from './config/mongodb.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import productRouter from './routes/productRoute.js';
import userRouter from './routes/userRoute.js';

// App Config
const app = express();
const port = process.env.PORT || 8001;

connectDB();
connectCloudinary();


// Middlewares -> It is the middleware between the request and response.
app.use(express.json());
app.use(cors());

// API Endpoints -> It defines the routes for the application
app.use('/api/users', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);

// Default Route for API Working
app.get('/', (req, res) => res.status(200).send('API WORKING'));

// Listening to the server
app.listen(port, () => console.log(`Listening on localhost:${port}`));


