/*********************
 * EXTENERAL IMPORTS *
 *********************/
import express, { Express } from 'express';
import path from 'path';
import mongoSanitize from 'express-mongo-sanitize';

/********************
 * INTERNAL IMPORTS *
 ********************/

// ROUTES
import indexRouter from './routes/index';
import authRouter from './routes/auth';
import initPassport from './configs/passport'
import initSession from './configs/session'
import initDB from './configs/database';

// MODELS

/**********************
 * APPLICATION CONFIG *
 **********************/

const app: Express = express();
app.set( "views", path.join( __dirname, "views" ) );
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(mongoSanitize({
    replaceWith: '_',
}))

/*******************
 * DATABASE CONFIG *
 *******************/
 initDB();

/***********
 * SESSION *
 ***********/
initSession(app);

/***************
 * AUTH CONFIG *
 ***************/
 initPassport(app);

/********************
 * IMPLEMENT ROUTES *
 ********************/
app.use('/', indexRouter);
app.use('/', authRouter);

export default app;