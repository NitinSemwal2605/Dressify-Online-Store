import express from 'express';
import { adminLogin, loginUser, registerUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/login', loginUser);
userRouter.post('/register', registerUser);
userRouter.post('/admin', adminLogin);


export default userRouter;

/*
Explanation:
1. Importing express to create a router for user-related routes.
2. Importing user controller functions for handling user login, registration, and admin login.
3. Creating a router instance using express.Router().
4. Defining routes for user login, registration, and admin login.
5. Exporting the userRouter to be used in the main server file.
*/

