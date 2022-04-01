import express, { Express, Request, Response } from 'express';
import ejs from 'ejs';
import path from 'path';

import indexRouter from './routes/index';
import authRouter from './routes/auth';

const app: Express = express();

app.set( "views", path.join( __dirname, "views" ) );
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter);
app.use('/', authRouter);


export default app;