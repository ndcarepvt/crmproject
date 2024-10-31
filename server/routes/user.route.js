import express from 'express';
import { loginUser, registerUser } from '../controller/user.controller.js';

const userRouter = express.Router();

// Define the route with multer middleware for file uploads
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

export default userRouter;
