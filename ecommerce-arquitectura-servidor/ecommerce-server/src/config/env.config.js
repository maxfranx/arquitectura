import dotenv from 'dotenv';
dotenv.config();

export default {
    app: {
        port: process.env.PORT || 8080,
        baseUrl: process.env.BASE_URL || 'http://localhost:8080'
    },
    db: {
        mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce'
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'jwt_default_secret',
        resetSecret: process.env.RESET_PASSWORD_SECRET || 'reset_default_secret'
    },
    mailing: {
        user: process.env.MAILING_USER || '',
        password: process.env.MAILING_PASSWORD || ''
    }
};
