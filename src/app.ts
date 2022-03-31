import express, { Express, Request, Response } from 'express';
import path from 'path';

const app: Express = express();

app.set( "views", path.join( __dirname, "views" ) );
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req: Request, res: Response) => {
  res.sendFile('views/index.html', {root: __dirname });
});

app.get('/login', (req: Request, res: Response) => {
  res.sendFile('views/login.html', {root: __dirname });
});

app.get('/signup', (req: Request, res: Response) => {
  res.sendFile('views/signup.html', {root: __dirname });
});

app.post('/login', (req: Request, res: Response) => {
  console.log('you are logged in!')
});

app.post('/signup', (req: Request, res: Response) => {
  console.log('you are signed up!')
});

app.post('/logout', (req: Request, res: Response) => {
  console.log('you are logged out!')
});

export default app;