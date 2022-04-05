import {Request, Response, NextFunction} from 'express';

// Route Guard Middleware
export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
    if (!req.isAuthenticated()) {
        // use ts ignore here for now, because a dumb type change for session
        // has been implemented for newest @types/express-session version
        //@ts-ignore
        req.session.returnTo = req.originalUrl;
        return res.redirect('/login');
    }
    next();
}