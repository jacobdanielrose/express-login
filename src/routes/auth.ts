import express, { Request, Response } from 'express';
import passport from 'passport'

import { renderLogin, register, renderSignup, login } from '../controllers/user'

const router = express.Router();

router.route('/login').get(renderLogin);

router.route('/signup').get(renderSignup);
  
router.post('/login/password', (passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), login));
  
router.post('/signup/password', register);
  
router.post('/logout', (req: Request, res: Response) => {
    console.log('you are logged out!');
});

export default router;