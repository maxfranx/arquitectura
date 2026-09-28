import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import config from './config/env.config.js';
import { initializePassport } from './config/passport.config.js';

import sessionsRouter from './routes/sessions.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initializePassport();
app.use(passport.initialize());

app.use('/api/sessions', sessionsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

mongoose.connect(config.db.mongoUri)
    .then(() => {
        console.log('Conectado exitosamente a MongoDB');
        app.listen(config.app.port, () => {
            console.log(`Servidor escuchando en el puerto ${config.app.port}`);
        });
    })
    .catch((err) => {
        console.error('Error al conectar a MongoDB:', err.message);
    });

export default app;
