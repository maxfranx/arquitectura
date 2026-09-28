import { Router } from 'express';
import passport from 'passport';
import { authorizeRole } from '../middlewares/auth.middleware.js';
import { addProductToCart } from '../controllers/cart.controller.js';

const router = Router();

// Solo el rol 'user' puede agregar productos al carrito
router.post('/:cid/products/:pid', 
    passport.authenticate('jwt', { session: false }), 
    authorizeRole('user'), 
    addProductToCart
);

export default router;
