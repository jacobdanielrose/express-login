import express, { Express, Request, Response } from 'express';
import path from 'path';
import mongoose from 'mongoose';
import session, { Store } from 'express-session';

import indexRouter from './routes/index';
import authRouter from './routes/auth';
import { SessionOptions } from 'http2';

import MongoStore from 'connect-mongo'


const dbUrl: string = 'mongodb://localhost:27017/express-login'

mongoose.connect(dbUrl)

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected")
})


const app: Express = express();

app.set( "views", path.join( __dirname, "views" ) );
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')))


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

const sessionConfig = {
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

app.use('/', indexRouter);
app.use('/', authRouter);


export default app;