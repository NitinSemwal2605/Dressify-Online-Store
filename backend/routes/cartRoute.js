import express from 'express';
import { addToCart, getCart, updateCart } from '../controllers/CartController.js';
import authUser from '../middlewares/auth.js';


const cartRouter = express.Router();

cartRouter.post('/get', authUser, getCart);
cartRouter.post('/add', authUser , addToCart);
cartRouter.post('/update', authUser , updateCart);

export default cartRouter;


/*
Explanation:
1. Importing express to create a router for cart-related routes.
2. Importing controller functions for handling cart operations like adding to cart, getting cart details, and updating the cart.
3. Importing authUser middleware to protect the routes and ensure that only authenticated users can access them.
4. Creating a router instance using express.Router().
5. Defining routes for getting the cart, adding items to the cart, and updating the cart.
6. Exporting the cartRouter to be used in the main server file.
*/