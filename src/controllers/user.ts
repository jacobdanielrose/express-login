import User from '../models/user';
import { Request, Response, NextFunction } from 'express';

export function renderSignup (req: Request, res: Response) {
    res.render('signup')
}

export async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, username, password } = req.body
        const user = new User({ email, username })
        const registeredUser = await User.register(user, password)
        req.login(registeredUser, err => {
            if (err) return next(err)
            res.redirect('/')
        })
    } catch (e) {
        console.log(e)
        res.redirect('/signup')
    }
}

export function renderLogin(req: Request, res: Response) {
    res.render('login')
}

export function login(req: Request, res: Response) {
    res.redirect('/')
}

export function logout(req: Request, res: Response) {
    req.logout()
    res.redirect('/logout')
}