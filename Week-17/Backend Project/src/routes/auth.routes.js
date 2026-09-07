import { Router } from "express";
import {
    changeCurrentPassword,
    forgotPasswordRequest,
    getCurrentUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser,
    resendEmailVerification,
    resetForgotPassword,
    verifyEmail,
} from '../controllers/auth.controllers.js';
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { validate } from "../middlewares/validator.middlewares.js";
import {
    userChangePasswordValidator,
    userForgotPasswordValidator,
    userLoginValidator,
    userRegistrationValidator,
    userResetForgottenPasswordValidator,
} from "../validators/index.validators.js";

const router = Router();

router.route("/register").post(userRegistrationValidator(),validate, registerUser);
router.route("/login").post(userLoginValidator(),validate,loginUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/verify-email/:verificationToken").get(verifyEmail);

router.route("/forgot-password").post(userForgotPasswordValidator(),validate, forgotPasswordRequest)
router.route("/reset-password/:resetToken").post(userResetForgottenPasswordValidator(), validate, resetForgotPassword,)
router.route('/logout').post(verifyJWT, logoutUser);

router.route("/current-user").get(verifyJWT,getCurrentUser);
router.route("/change-password").post(verifyJWT,userChangePasswordValidator(),validate, changeCurrentPassword,)
router.route("/resend-email-verification").post(verifyJWT, resendEmailVerification)

export default router;