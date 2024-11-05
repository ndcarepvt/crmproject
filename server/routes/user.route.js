import express from 'express';
import { getUserDetails, loginUser, registerUser } from '../controller/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const userRouter = express.Router();

// Define the route with multer middleware for file uploads
userRouter.post('/login', loginUser);
userRouter.post('/register', registerUser);
userRouter.post('/getuserdetails', authMiddleware, getUserDetails);

export default userRouter;
