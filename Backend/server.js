import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import {connectDb} from './db/connectDb.js';
import authRouter from './routers/auth.router.js';
import cookieParser from 'cookie-parser';
const app = express();

// middlewares
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/auth', authRouter);
app.get('/', (req, res) => {
    res.send('Home page');
})
app.listen(process.env.PORT, () => {
    console.log('Server is running on port', process.env.PORT);
    connectDb();
});