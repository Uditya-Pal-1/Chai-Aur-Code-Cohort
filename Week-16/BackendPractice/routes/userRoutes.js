import express from "express";
import { login, logOutUser, profile, registerUser, verifyUser } from "../controllers/userController.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/register',registerUser);
router.get('/verify/:token', verifyUser);
router.post('/login', login);
router.get('/me',isLoggedIn, profile);
router.post('/logOutUser',isLoggedIn, logOutUser);

export default router;