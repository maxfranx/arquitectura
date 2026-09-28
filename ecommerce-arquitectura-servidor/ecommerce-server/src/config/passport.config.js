import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import config from './env.config.js';
import { userRepository } from '../repositories/index.js';

export const initializePassport = () => {
    const options = {
        jwtFromRequest: ExtractJwt.fromExtractors([
            ExtractJwt.fromAuthHeaderAsBearerToken(),
            (req) => req?.cookies?.jwtToken || null
        ]),
        secretOrKey: config.jwt.secret
    };

    passport.use('jwt', new JwtStrategy(options, async (jwtPayload, done) => {
        try {
            const user = await userRepository.getById(jwtPayload.id);
            if (!user) return done(null, false);
            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    }));
};
