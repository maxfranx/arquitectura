import { Router } from 'express';
import passport from 'passport';
import { authorizeRole } from '../middlewares/auth.middleware.js';
import { 
    getAllProducts, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} from '../controllers/product.controller.js';

const router = Router();

// Endpoint público
router.get('/', getAllProducts);

// Solo el rol 'admin' puede crear, actualizar y eliminar productos
router.post('/', passport.authenticate('jwt', { session: false }), authorizeRole('admin'), createProduct);
router.put('/:pid', passport.authenticate('jwt', { session: false }), authorizeRole('admin'), updateProduct);
router.delete('/:pid', passport.authenticate('jwt', { session: false }), authorizeRole('admin'), deleteProduct);

export default router;
