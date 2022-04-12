import passport from 'passport';
import Express from 'express'
import { Strategy as LocalStrategy } from 'passport-local';
import session from 'express-session';
import { store, secret } from '../database'

import User from '../../models/user'
import { localAuth } from './strategies/local-auth';

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

   
    app.use(session(sessionConfig))
    app.use(passport.initialize())
    app.use(passport.session())

    passport.serializeUser((user : any, done) => {
        done(null, user.id);
    })
    
    passport.deserializeUser((id, done) => {
        User.findById(id, (err : any, user : any) => {
            done(err, user);
        })
    })

    passport.use(localAuth)

}
