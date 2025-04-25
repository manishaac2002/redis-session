import redisClient from '../utils/redisClient.js';

export const getUserSessionId = async (userId) =>
  await redisClient.get(`user:${userId}:sessionId`);

export const setUserSessionId = async (userId, sessionId) =>
  await redisClient.set(`user:${userId}:sessionId`, sessionId);

export const destroySessionById = async (sessionId) =>
  await redisClient.del(`session:${sessionId}`);
