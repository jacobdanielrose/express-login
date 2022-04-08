import passport from 'passport';
import Express from 'express'
import { Strategy as LocalStrategy } from 'passport-local';
import GoogleStrategy from 'passport-google-oauth20';
import session from 'express-session';
import { store, secret } from './database'

import User from '../models/user'

export default function initAuth(app: Express.Application) {
    const sessionConfig: any = {
        store: store,
        name: 'session',
        secret: secret,
        resave: false,
        saveUninitialized: true,
        cookie: {
            //secure: true,
            httpOnly: true,
            expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    }

    const googleClientConfig: any = {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_ID,
        callbackURL: "http://www.example.com/auth/google/callback"
    }
    app.use(session(sessionConfig))
    app.use(passport.initialize())
    app.use(passport.session())
    passport.use(new LocalStrategy(User.authenticate()))
    passport.serializeUser(User.serializeUser())
    passport.deserializeUser(User.deserializeUser())
}
