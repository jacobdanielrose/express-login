import express, { Request, Response } from 'express';
import passport from 'passport'
import LocalStrategy from 'passport-local'
import crypto from 'crypto'

const router = express.Router();

router.get('/login/password', (req: Request, res: Response) => {
    res.render('login');
});
  
router.get('/signup', (req: Request, res: Response) => {
    res.render('signup');
});
  
router.post('/login', (req: Request, res: Response) => {
    console.log('you are logged in!')
});
  
router.post('/signup', (req: Request, res: Response) => {
    console.log('you are signed up!')
});
  
router.post('/logout', (req: Request, res: Response) => {
    console.log('you are logged out!')
});

export default router;