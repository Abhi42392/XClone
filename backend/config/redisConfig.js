// redisClient.js
import { createClient } from 'redis';

const redisClient = createClient({
   url: process.env.REDIS_URL // default Redis port
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

redisClient.on('connect', () => {
  console.log('✅ Redis connected');
});

// Optional: handle disconnect and auto-reconnect
redisClient.on('end', () => {
  console.warn('Redis disconnected. Retrying in 3s...');
  setTimeout(() => {
    redisClient.connect().catch(console.error);
  }, 3000);
});

await redisClient.connect();

export default redisClient;
