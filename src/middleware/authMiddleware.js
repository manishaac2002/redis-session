import { getUserSessionId } from '../services/sessionService.js';

export const authMiddleware = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Not logged in' });
  }

  const validSessionId = await getUserSessionId(req.session.userId);

  if (req.sessionID !== validSessionId) {
    return res.status(403).json({ message: 'Session expired or logged in elsewhere' });
  }

  next();
};
