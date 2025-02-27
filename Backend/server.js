import express from 'express';
import dotenv from 'dotenv';
import {connectDb} from './db/connectDb.js';
import authRouter from './routers/auth.router.js';
const app = express();
dotenv.config();

// middlewares
app.use(express.json());
app.use('/api/auth', authRouter);
app.get('/', (req, res) => {
    res.send('Home page');
})
app.listen(process.env.PORT, () => {
    console.log('Server is running on port', process.env.PORT);
    connectDb();
});