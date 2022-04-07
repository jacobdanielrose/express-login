import session from 'express-session';
import Express from 'express'
import { store, secret } from './database'

// TODO: find right type
export default function initSession(app: Express.Application) {
    const sessionConfig: any = {
        store: store,
        name: 'session',
        secret: secret,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: true,
            httpOnly: true,
            expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    }
    app.use(session(sessionConfig))
}