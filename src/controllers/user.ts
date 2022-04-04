import { Request, Response } from 'express';

module.exports.login = (req: Request, res: Response) => {
    res.redirect('/')
}

module.exports.logout = (req: Request, res: Response) => {
    req.logout()
    res.redirect('/')
}