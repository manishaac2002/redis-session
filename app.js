import express from 'express';
import session from 'express-session';
import RedisStore from 'connect-redis';
import redisClient from './src/utils/redisClient.js';
import authRoutes from './src/routes/authRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const store = new RedisStore({
  client: redisClient,
  prefix: 'session:'
});

app.use(
  session({
    store,
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  })
);

app.use('/auth', authRoutes);

export default app;
