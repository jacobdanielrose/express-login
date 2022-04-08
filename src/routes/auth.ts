import { Router } from '@awaitjs/express';
import { Request, Response } from 'express';
import passport from 'passport'

import { renderLogin, register, renderSignup, login, logout } from '../controllers/user'

const router = Router();

router.route('/login').get(renderLogin);

router.route('/signup').get(renderSignup);
  
router.post('/login/password', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), login);
  
router.postAsync('/signup/password', register);
  
router.post('/logout', logout);

export default router;