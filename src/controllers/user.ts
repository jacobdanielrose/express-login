import User from '../models/user';
import { Request, Response, NextFunction } from 'express';

export function renderSignup (req: Request, res: Response) {
    res.render('signup')
}

export function renderLogin(req: Request, res: Response) {
    res.render('login')
}

export async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, username, password } = req.body
        const user = new User({ email, password })
        const registeredUser = await user.save()
        req.login(registeredUser, err => {
            if (err) return next(err)
            res.redirect('/')
        })
    } catch (e) {
        console.log(e)
        res.redirect('/signup')
    }
}

export function login(req: Request, res: Response) {
    // use ts ignore here for now, because a dumb type change for session
    // has been implemented for newest @types/express-session version
    //@ts-ignore
    const redirectUrl = req.session.returnTo || '/'
    //@ts-ignore
    delete req.session.returnTo
    res.redirect(redirectUrl)
}

export function logout(req: Request, res: Response) {
    req.logout()
    res.redirect('/login')
}