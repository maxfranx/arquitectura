import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config/env.config.js';
import { sendPasswordResetEmail } from '../services/mailing.service.js';
import { userRepository } from '../repositories/index.js';

export const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userRepository.getByEmail(email);

        if (!user) {
            return res.status(404).json({ status: 'error', message: 'Usuario no registrado' });
        }

        // Token firmado con tiempo de expiración de 1 hora
        const resetToken = jwt.sign(
            { email: user.email, sub: user._id },
            config.jwt.resetSecret,
            { expiresIn: '1h' }
        );

        await sendPasswordResetEmail(user.email, resetToken);

        res.json({ 
            status: 'success', 
            message: 'Correo de recuperación enviado con éxito. El enlace expira en 1 hora.' 
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ status: 'error', message: 'Token y nueva contraseña requeridos' });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, config.jwt.resetSecret);
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(400).json({ 
                    status: 'error', 
                    message: 'El enlace ha expirado tras 1 hora. Solicite uno nuevo.' 
                });
            }
            return res.status(400).json({ status: 'error', message: 'Token inválido o corrupto.' });
        }

        const user = await userRepository.getByEmail(decoded.email);
        if (!user) {
            return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
        }

        // Evitar que el usuario utilice la misma contraseña anterior
        const isSamePassword = await bcrypt.compare(newPassword, user.password);
        if (isSamePassword) {
            return res.status(400).json({ 
                status: 'error', 
                message: 'No puedes usar la misma contraseña anterior. Elige una distinta.' 
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await userRepository.update(user._id, { password: hashedPassword });

        res.json({ status: 'success', message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
