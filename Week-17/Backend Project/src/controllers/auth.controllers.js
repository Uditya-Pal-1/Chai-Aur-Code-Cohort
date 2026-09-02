import { asyncHandler } from '../utils/async-handler.js';
import { User } from '../models/user.models.js';
import crypto from 'crypto';

//registerUser
const registerUser = asyncHandler(async (req, res)=>{
    const {email, username, password, role} = req.body;
    if(!email || !username || !password){
        return res.status(400).json({
            success: false,
            message: 'email, username or password are required.'
        });
    }

    // finding existing user
    const existingUser = await User.findOne({
        $or: [{username: username},{email: email}]
    })
    if(existingUser){
        return res.status(409).json({
            success: false,
            message: 'existing user cannot register again with same email'
        })
    }

    //create new user
    const user = await User.create({
        username,
        email,
        password,
        role: role || "USER"
    })

    //fatch the newly created user but excluding password field
    const createdUser = await User.findById(user._id).select('-password');

    if(!createdUser) {
        return res.status(500).json({
            status: false,
            message: 'something went false when registering user'
        })
    }
    return res.status(200).json({
        status: true,
        message: 'successfully registered!!',
        data: createdUser,
    })
})

//loginUser
const loginUser = asyncHandler(async (req, res)=>{
    const {email, password, username} = req.body;

    if(!password || (!email && !username)){
        return res.status(400).json({
            success: false,
            message: "Wrong Credentials"
        })
    }
    const user = await User.findOne({
        $or: [{username: username},{email: email}]
    })
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User does not exist."
        })
    }
    const isPasswordValid = await user.isPasswordCorrect(password);
    if(!isPasswordValid){
        return res.status(400).json({
            success: false,
            message: 'invalid login credentials'
        })
    }
    //generate access token using jwt
    const accessToken = await user.generateAccessToken();
    const loggedInUser = await User.findById(user._id).select('-password')

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res.status(200).cookie('accessToken', accessToken, options).json({
        success: true,
        message: 'loggedIn successfully!!',
        data: loggedInUser,
    })
})

//logoutUser
const logoutUser = asyncHandler(async (req, res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1,
            },
        },
            {
                new: true,
            }
    )
    const options = {
        httpOnly: true,
        secure: true,
    }
    return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
        success: true,
        message: 'user logout successfully!!'
    });
})

//verifyEmail
const verifyEmail = asyncHandler(async (req, res)=>{
    const { token } = req.params;
    if(!token){
        return res.status(400).json({
            success: false,
            message: "Email verification is failed!! due to token not found."
        })
    }
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({
        emailVerificationToken: hashedToken,
        emailVerificationExpiry: {$gt: Date.now()}
    })
    if(!user){
        return res.status(400).json({
            success: false,
            message: "Verification token is invalid"
        })
    }
    user.isEmailVerified = true;
    user.emailVerificationToken= undefined;
    user.emailVerificationExpiry= undefined;

    await user.save({validateBeforeSave: false});

    return res.status(200).json({
        success: true,
        message: "Email verification successfull"
    })
})

//resendEmailVerification
const resendEmailVerification = asyncHandler(async (req, res)=>{
    const {email} = req.body;
    if(!email){
        return res.status(400).json({
            success: false,
            message: "Email is required"
        })
    }
    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({
            success: false,
            message: "User not found!!"
        })
    }
    if(user.isEmailVerified){
        return res.status(400).json({
            success: false ,
            message: "Email is already Verified !! you can login"
        })
    }
    const {unHashedToken, hashedToken, tokenExpiry} = user.generateTemporaryToken();
    user.emailVerificationToken= hashedToken;
    user.emailVerificationExpiry= tokenExpiry;
    await user.save({validateBeforeSave: false});

    const verificationUrl = `${process.env.BASE_URL}/verify/`
})

const resetForgotPassword = asyncHandler(async (req, res)=>{
    const {email, username, password, role} = req.body;

    //resetForgotPassword
})

const refreshAccessToken = asyncHandler(async (req, res)=>{
    const {email, username, password, role} = req.body;

    //refreshAccessToken
})

const forgotPasswordRequest = asyncHandler(async(req, res)=>{
    const {email} = req.body;

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