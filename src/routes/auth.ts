import express, { Request, Response } from 'express';
import passport from 'passport'

const router = express.Router();

router.get('/login', (req: Request, res: Response) => {
    res.render('login');
});
  
router.get('/signup', (req: Request, res: Response) => {
    res.render('signup');
});
  
router.post('/login/password', (req: Request, res: Response) => {
    passport.authenticate});
  
router.post('/signup/password', passport.authenticate('local', { failureRedirect: '/login' }), 
(req: Request, res: Response) => {
    res.render('/');
});
  
router.post('/logout', (req: Request, res: Response) => {
    console.log('you are logged out!')
});

export default router;