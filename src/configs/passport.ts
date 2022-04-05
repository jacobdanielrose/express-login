import passport from 'passport';
import Express from 'express'
import { Strategy as LocalStrategy } from 'passport-local';

import User from '../models/user'

export default function initPassport(app: Express.Application) {
    app.use(passport.initialize())
    app.use(passport.session())
    passport.use(new LocalStrategy(User.authenticate()))
    passport.serializeUser(User.serializeUser())
    passport.deserializeUser(User.deserializeUser())
}
