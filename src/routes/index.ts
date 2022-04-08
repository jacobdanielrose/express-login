import express, { Request, Response } from 'express';
import { isLoggedIn } from '../middleware';

const router = express.Router();

router.get('/', isLoggedIn , (_req: Request, res: Response) => {
    res.render('index');
  });

export default router;