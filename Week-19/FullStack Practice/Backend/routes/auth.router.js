import express from 'express';
import {
    registerUser,
    loginUser,
    verifyEmail,
    logoutUser,
    forgotPassword,
    resetPassword
} from '../controllers/auth.controller.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/verify/:token', verifyEmail);
userRouter.post('/logout', logoutUser);
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/reset-password/:token', resetPassword);

export default userRouter;