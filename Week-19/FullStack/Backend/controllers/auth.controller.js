import prisma from '../utils/db.util.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const getTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST || 'sandbox.smtp.mailtrap.io',
        port: Number(process.env.MAILTRAP_PORT) || 587,
        secure: false,
        auth: {
            user: process.env.MAILTRAP_USERNAME,
            pass: process.env.MAILTRAP_PASSWORD,
        }
    });
};

export const registerUser = async (req, res) => {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required'
        });
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(32).toString('hex');

        const user = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                password: hashedPassword,
                verificationToken
            }
        });

        const baseUrl = process.env.BASE_URL || process.env.PORT_URL || 'http://localhost:3000';
        const verificationURL = `${baseUrl}/api/v1/users/verify/${verificationToken}`;

        try {
            const transporter = getTransporter();
            const mailOptions = {
                from: process.env.MAILTRAP_SENDEMAIL || 'no-reply@example.com',
                to: user.email,
                subject: 'Verify your email address',
                text: `Welcome ${user.name}!\n\nPlease click on the following link to verify your email account:\n\n${verificationURL}`,
            };
            await transporter.sendMail(mailOptions);
        } catch (mailError) {
            console.error('Mail sending failed:', mailError.message);
        }

        return res.status(201).json({
            success: true,
            message: 'User registered successfully. Please check your email to verify your account.',
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: 'User unable to register.'
        });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required.'
        });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email or password.'
            });
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email or password.'
            });
        }

        const secret = process.env.JWT_SECRET || 'secret';
        const token = jwt.sign(
            { id: user.id, role: user.role },
            secret,
            { expiresIn: process.env.JWT_COOKIE_EXPIRE_TIME || '24h' }
        );

        const cookieOptions = {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        };

        res.cookie('token', token, cookieOptions);

        return res.status(200).json({
            success: true,
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified
            },
            message: 'Login successful'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: 'Login failed'
        });
    }
};

export const verifyEmail = async (req, res) => {
    const { token } = req.params;

    if (!token) {
        return res.status(400).json({
            success: false,
            message: 'Verification token is missing'
        });
    }

    try {
        const user = await prisma.user.findFirst({
            where: { verificationToken: token }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired verification token'
            });
        }

        await prisma.user.update({
            where: { id: user.id },
            data: {
                isVerified: true,
                verificationToken: null
            }
        });

        return res.status(200).json({
            success: true,
            message: 'Email verified successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: 'Verification failed'
        });
    }
};

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: 'Logout failed'
        });
    }
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            success: false,
            message: 'Email is required'
        });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User with this email does not exist'
            });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetExpiry = (Date.now() + 3600000).toString(); // 1 hour

        await prisma.user.update({
            where: { id: user.id },
            data: {
                passwordResetToken: resetToken,
                passwordResetExpiry: resetExpiry
            }
        });

        const baseUrl = process.env.BASE_URL || process.env.PORT_URL || 'http://localhost:3000';
        const resetURL = `${baseUrl}/api/v1/users/reset-password/${resetToken}`;

        try {
            const transporter = getTransporter();
            const mailOptions = {
                from: process.env.MAILTRAP_SENDEMAIL || 'no-reply@example.com',
                to: user.email,
                subject: 'Password Reset Request',
                text: `You requested a password reset. Please click on the link below to reset your password:\n\n${resetURL}\n\nThis link will expire in 1 hour.`,
            };
            await transporter.sendMail(mailOptions);
        } catch (mailError) {
            console.error('Password reset email failed:', mailError.message);
        }

        return res.status(200).json({
            success: true,
            message: 'Password reset link sent to your email.'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: 'Forgot password request failed'
        });
    }
};

export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).json({
            success: false,
            message: 'Reset token and new password are required'
        });
    }

    try {
        const user = await prisma.user.findFirst({
            where: { passwordResetToken: token }
        });

        if (!user || !user.passwordResetExpiry || Number(user.passwordResetExpiry) < Date.now()) {
            return res.status(400).json({
                success: false,
                message: 'Password reset token is invalid or has expired'
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                passwordResetToken: null,
                passwordResetExpiry: null
            }
        });

        return res.status(200).json({
            success: true,
            message: 'Password reset successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: 'Reset password failed'
        });
    }
};
