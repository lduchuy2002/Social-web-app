import express from 'express';
import 'express-async-errors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import * as dotenv from 'dotenv';
import UserRouter from '@routes/user.route';
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
    methods: ['POST', 'PUT', 'DELETE', 'PATCH', 'GET', 'OPTIONS'],
  })
);

app.use('/api', UserRouter);

export default app;
