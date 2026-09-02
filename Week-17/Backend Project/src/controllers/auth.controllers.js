import { asyncHandler } from '../utils/async-handler.js';
import { User } from '../models/user.models.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { sendEmail, emailVerificationMailgenContent, forgotPasswordMailgenContent, } from '../utils/mail.js'

//registerUser
const registerUser = asyncHandler(async (req, res) => {
    const { email, username, password, role } = req.body;
    if (!email || !username || !password) {
        return res.status(400).json({
            success: false,
            message: 'email, username or password are required.'
        });
    }

    // finding existing user
    const existingUser = await User.findOne({
        $or: [{ username: username }, { email: email }]
    })
    if (existingUser) {
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

    if (!createdUser) {
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
const loginUser = asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;

    if (!password || (!email && !username)) {
        return res.status(400).json({
            success: false,
            message: "Wrong Credentials"
        })
    }
    const user = await User.findOne({
        $or: [{ username: username }, { email: email }]
    })
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User does not exist."
        })
    }
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
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
const logoutUser = asyncHandler(async (req, res) => {
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
const verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.params;
    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Email verification is failed!! due to token not found."
        })
    }
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({
        emailVerificationToken: hashedToken,
        emailVerificationExpiry: { $gt: Date.now() }
    })
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Verification token is invalid"
        })
    }
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpiry = undefined;

    await user.save({ validateBeforeSave: false });

    return res.status(200).json({
        success: true,
        message: "Email verification successfull"
    })
})

//resendEmailVerification
const resendEmailVerification = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email is required"
        })
    }
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "User not found!!"
        })
    }
    if (user.isEmailVerified) {
        return res.status(400).json({
            success: false,
            message: "Email is already Verified !! you can login"
        })
    }
    const { unHashedToken, hashedToken, tokenExpiry } = user.generateTemporaryToken();
    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpiry = tokenExpiry;
    await user.save({ validateBeforeSave: false });

    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${unHashedToken}`;
    const mailgenContent = emailVerificationMailgenContent(user.username, verificationUrl)
    await sendEmail({
        email: user.email,
        message: "resend verify email",
        mailgenContent: mailgenContent,
    })
    return res.status(200).json({
        success: true,
        message: "Email Verification Resend successfully!!"
    })
})

//resetForgotPassword
const resetForgotPassword = asyncHandler(async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;
    if (!token || !newPassword) {
        return res.status(400).json({
            success: false,
            message: "Token and new password required."
        })
    }
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({
        forgotPasswordToken: hashedToken,
        forgotPasswordExpiry: { $gt: Date.now() }
    })
    user.password = newPassword
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;

    await user.save({ validateBeforeSave: false })

    return res.status(200).json({
        success: true,
        message: "forgot password reset successfully! now you can login"
    })
})


//refreshAccessToken
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) {
        return res.status(401).json({
            success: false,
            message: "unautorized request. no refresh token found."
        })
    }
    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET,
        )
        const user = await User.findById(decodedToken?._id)
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user is invalid"
            })
        }
        if (incomingRefreshToken !== user?.refreshToken) {
            return res.status(400).json({
                success: false,
                message: "Refresh token has been expired or already be used."
            })
        }
        const accessToken = await user.generateAccessToken();
        const newRefreshToken = await user.generateRefreshToken();
        user.refreshToken = newRefreshToken;
        await user.save({ validateBeforeSave: false })
        const options = {
            httpOnly: true,
            secure: true,
        }
        return res.status(200)
            .cookie('accessToken', accessToken, options)
            .cookie('refreshToken', newRefreshToken, options)
            .json({
                success: true,
                message: "Access token refresh successfully"
            })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Invalid or expired refresh token"
        })
    }
})

//forgotPasswordRequest
const forgotPasswordRequest = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({
            success: false,
            message: 'Email Required'
        })
    }
    const user = await User.findOne(email);
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "User with the email doesn't exist"
        })
    }
    const { unHashedToken, hashedToken, tokenExpiry } = user.generateTemporaryToken();
    user.forgotPasswordToken = hashedToken;
    user.forgotPasswordExpiry = tokenExpiry;
    await user.save({ validateBeforeSave: false })

    const passwordResetUrl = `${process.env.FRONTEND_URL}/reset-password/${unHashedToken}`

    const mailgenContent = forgotPasswordMailgenContent(user.username, passwordResetUrl)

    await sendEmail({
        email: user.email,
        subject: "reset your password",
        mailgenContent: mailgenContent
    })
    return res.status(200).json({
        success: true,
        message: "password reset email successfully. please check your inbox."
    })
})

//changeCurrentPassword
const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword} = req.body;
    if(!oldPassword || !newPassword){
        return res.status(400).json({
            success: false,
            message: "Both old and new password required"
        })
    }
    const user = User.findById(req.user?._id)
    if(!user){
        return res.status(401).json({
            success: false,
            message: "User not found"
        })
    }
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if(!isPasswordCorrect){
        return res.status(400).json({
            success: false,
            message: "invalid old password"
        })
    }
    user.password = newPassword;
    await user.save({validateBeforeSave: false})
    return res.status(200).json({
        success: true, 
        message: "password change successfully!"
    })
})

//getCurrentPassword
const getCurrentPassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user?._id).select('-password')
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "User not found",
        })
    }
    return res.status(200).json({
        success: true,
        message: "current user fetch successfully",
        data: user,
    })

})

export {
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