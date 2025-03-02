import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import {connectDb} from './db/connectDb.js';
import authRouter from './routers/auth.router.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();

// middlewares
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
// routes
app.use('/api/auth', authRouter);

app.listen(process.env.PORT, () => {
    console.log('Server is running on port', process.env.PORT);
    connectDb();
});