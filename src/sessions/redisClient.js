import { createClient } from 'redis';

const redisClient = createClient();

redisClient.on('connect', () => {
  console.log('✅ Redis client connected successfully');
});

redisClient.on('error', (err) => {
  console.error('❌ Redis client connection error:', err);
});

await redisClient.connect();

export default redisClient;

