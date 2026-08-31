import Mailgen from 'mailgen';
import nodemailer from 'nodemailer'

/**
 * @param {{email: string; subject: string; mailgenContent: Mailgen.Content; }} options
 */
const sendEmail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Task Manager",
            link: "https://taskmanager.app",
        },
    });
    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);

    const emailHTML = mailGenerator.generate(options.mailgenContent);

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS,
        },
    });

    const mail = {
        from: "mail.amanpal5035286@gmail.com",
        to: options.email,
        subject: options.subject,
        text: emailTextual,
        html: emailHTML,
    };

    try {
        await transporter.sendMail(mail);
    } catch (error) {
        console.error('Email service failed silently. Make sure you have provided your MAILTRAP credentials in the .env file',
        );
        console.error("Error: ", error)
    }
};

/**
 * @param {string} username
 * @param {string} verificationUrl
 * @returns {Mailgen.Content}
 * @description it designs the email verification mail
 */
const emailVerificationMailgenContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: 'welcome to our app',
            action: {
                instructions: 'to verify email click on below button.',
                button: {
                    color: "#23BC66",
                    text: "verify your email",
                    link: verificationUrl,
                },
            },
            outro: 'need help or have any questions.'
        }
    }
};

/**
 * @param {string} username,
 * @param {string} passwordResetUrl
 * @returns {Mailgen.Content}
 * @description it is design for forgot password mail.
 */
const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
    return {
        body: {
            name: username,
            intro: 'To reset your password.',
            action: {
                instructions: 'to reset forgot password',
                button: {
                    color: "#22AB88",
                    text: "Reset Password",
                    link: passwordResetUrl,
                },
            },
            outro: "need help or have any Question ? Just reply this email. we'd love to help.",
        },
    }
};

export {
    sendEmail,
    emailVerificationMailgenContent,
    forgotPasswordMailgenContent,
}