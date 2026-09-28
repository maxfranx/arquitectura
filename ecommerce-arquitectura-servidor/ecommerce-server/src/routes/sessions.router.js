import { Router } from 'express';
import passport from 'passport';
import UserDTO from '../dtos/user.dto.js';
import { requestPasswordReset, resetPassword } from '../controllers/auth.controller.js';

const router = Router();

// Ruta /current: devuelve el DTO del usuario sin información sensible
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    const userDto = new UserDTO(req.user);
    res.json({ status: 'success', payload: userDto });
});

// Rutas de recuperación de contraseña
router.post('/forgot-password', requestPasswordReset);
router.post('/reset-password', resetPassword);

export default router;
