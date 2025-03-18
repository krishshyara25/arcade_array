const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use TLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // Match .env variable
    }
});

const sendResetEmail = async (email, token) => {
    const resetUrl = `http://localhost:5174/reset-password/${token}`; // Frontend local port
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request - Arcade Array',
        html: `
            <h2>Reset Your Password</h2>
            <p>You requested a password reset for your Arcade Array account.</p>
            <p>Click <a href="${resetUrl}">here</a> to reset your password.</p>
            <p>This link will expire in 1 hour.</p>
            <p>If you didn’t request this, please ignore this email.</p>
        `
    };

    try {
        console.log('Sending email with:', { from: process.env.EMAIL_USER, to: email, resetUrl });
        await transporter.sendMail(mailOptions);
        console.log(`✅ Reset email sent to ${email}`);
    } catch (error) {
        console.error('❌ Error sending reset email:', error);
        throw new Error('Failed to send reset email');
    }
};

module.exports = { sendResetEmail };