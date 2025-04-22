import express from 'express';
import session from 'express-session';
import { createClient } from 'redis';
import { RedisStore } from 'connect-redis';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Create Redis client
const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  // password: process.env.REDIS_PASSWORD, // Uncomment if needed
});

redisClient.connect()
  .then(() => console.log('✅ Redis connected successfully'))
  .catch(err => console.error('❌ Redis connection error:', err));

// Set up Redis session store
const redisStore = new RedisStore({
  client: redisClient,
  prefix: 'sess:',
});

app.use(session({
  store: redisStore,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true if using HTTPS
    maxAge: 1000 * 60 * 60, // 1 hour
  },
}));

// Sample route
app.get('/', (req, res) => {
  if (req.session.views) {
    req.session.views++;
    res.send(`Visited ${req.session.views} times.`);
  } else {
    req.session.views = 1;
    res.send('Hello! Refresh to track session.');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
