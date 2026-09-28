import nodemailer from 'nodemailer';
import config from '../config/env.config.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.mailing.user,
        pass: config.mailing.password
    }
});

export const sendPasswordResetEmail = async (toEmail, token) => {
    const resetUrl = `${config.app.baseUrl}/reset-password?token=${token}`;

    const mailOptions = {
        from: `Ecommerce Support <${config.mailing.user}>`,
        to: toEmail,
        subject: 'Recuperación de Contraseña',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Restablecimiento de Contraseña</h2>
                <p>Has solicitado restablecer tu contraseña. Haz clic en el botón a continuación para proceder:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                        Restablecer Contraseña
                    </a>
                </div>
                <p style="color: #666; font-size: 14px;"><strong>Nota importante:</strong> Este enlace expirará exactamente en 1 hora tras ser enviado.</p>
                <p style="color: #999; font-size: 12px;">Si no solicitaste este cambio, puedes ignorar este mensaje.</p>
            </div>
        `
    };

    return await transporter.sendMail(mailOptions);
};
