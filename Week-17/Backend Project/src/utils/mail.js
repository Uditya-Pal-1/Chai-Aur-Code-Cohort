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
    const emailTextual= mailGenerator.generatePlaintext(options.mailgenContent );

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
    from:"mail.amanpal5035286@gmail.com",
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    htmlL: emailHTML,
};

try{
    await transporter.sendMail(mail);
}catch(error){
    console.error('Email service failed silently. Make sure you have provided your MAILTRAP credentials in the .env file',
    );
    console.error("Error: ", error)
}
}