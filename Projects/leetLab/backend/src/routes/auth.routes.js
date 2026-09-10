import express from "express";
import {register, login, logout, check} from '../controllers/auth.controller.js'

const authRoutes = express.Router();

authRoutes.post('/register', register)
authRoutes.post('/login', login)
authRoutes.post('/logout',logout)
authRoutes.get('/check',check)

export default authRoutes;