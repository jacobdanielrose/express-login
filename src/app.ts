/*********************
 * EXTENERAL IMPORTS *
 *********************/
import express, { Express } from 'express';
import path from 'path';
import { connect, connection } from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import mongoSanitize from 'express-mongo-sanitize';
import MongoStore from 'connect-mongo'

/********************
 * INTERNAL IMPORTS *
 ********************/

// ROUTES
import indexRouter from './routes/index';
import authRouter from './routes/auth';

// MODELS
import User from './models/user'

// CONTROLLERS

// UTILS

/*******************
 * DATABASE CONFIG *
 *******************/

const dbUrl: string = 'mongodb://localhost:27017/express-login';
connect(dbUrl)
const db = connection;
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected")
})
const secret = process.env.SECRET || 'thisshouldbeabettersecret!';
const storeOptions = {
    mongoUrl: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60
}
const store = new MongoStore(storeOptions)
store.on("error", function (e: any) {
    console.log("SESSION STORE ERROR", e)
})


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

/***********
 * SESSION *
 ***********/

// TODO: find right type
const sessionConfig: any = {
    store: store,
    name: 'session',
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))


/***************
 * AUTH CONFIG *
 ***************/
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


/********************
 * IMPLEMENT ROUTES *
 ********************/
app.use('/', indexRouter);
app.use('/', authRouter);

export default app;