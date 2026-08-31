import { asyncHandler } from '../utils/async-handler.js';

const registerUser = asyncHandler(async (req, res)=>{
    const {email, username, password, role} = req.body;

    //registerUser
})

const loginUser = asyncHandler(async (req, res)=>{
    const {email, username, password, role} = req.body;
    //loginUser
})

const logoutUser = asyncHandler(async (req, res)=>{
    const {email, username, password, role} = req.body;

    //logoutUser
})

const verifyEmail = asyncHandler(async (req, res)=>{
    const {email, username, password, role} = req.body;

    //verifyEmail
})

const resendEmailVerification = asyncHandler(async (req, res)=>{
    const {email, username, password, role} = req.body;

    //resendEmailVerification
})

const resetForgotPassword = asyncHandler(async (req, res)=>{
    const {email, username, passowrd, role} = req.body;

    //resetForgotPassword
})

const refreshAccessToken = asyncHandler(async (req, res)=>{
    const {email, username, passowrd, role} = req.body;

    //refreshAccessToken
})

const forgotPasswordRequest = asyncHandler(async(req, res)=>{
    const {email, username, password, role} = req.body;

    //forgotPasswordRequest
})

const changeCurrentPassword = asyncHandler(async(req, res)=>{
    const {email, username, password, role} = req.body;

    //changeCurrentPassword
})

const getCurrentPassword = asyncHandler(async(req, res) => {
    const {email, username, password, role} = req.body;

    //getCurrentPassword
})

export{
    registerUser,
    loginUser,
    logoutUser,
    verifyEmail,
    resendEmailVerification,
    resetForgotPassword,
    refreshAccessToken,
    forgotPasswordRequest,
    changeCurrentPassword,
    getCurrentPassword,
}