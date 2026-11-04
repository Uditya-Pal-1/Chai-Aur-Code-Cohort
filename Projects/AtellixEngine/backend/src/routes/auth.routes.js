import express from "express";
import {register, login, logout, check} from '../controllers/auth.controller.js';
import {authMiddleware} from "../middlewares/auth.middleware.js";

const authRoutes = express.Router();

authRoutes.post('/register', register)
authRoutes.post('/login', login)
authRoutes.post('/logout', authMiddleware, logout)
authRoutes.get('/check',authMiddleware, check)

export default authRoutes;