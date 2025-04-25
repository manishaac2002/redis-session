import {
    getUserSessionId,
    setUserSessionId,
    destroySessionById
  } from '../services/sessionService.js';
  
  // Simulated DB call
  const findUserInDb = async (username, password) => {
    if (username === 'admin' && password === '123') {
      return { id: 'user1', username: 'admin' };
    }
    return null;
  };
  
  export const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await findUserInDb(username, password);
  
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  
    const existingSessionId = await getUserSessionId(user.id);
  
    if (existingSessionId && existingSessionId !== req.sessionID) {
      return res.status(200).json({
        message: 'Already logged in on another device',
        options: ['logout_other', 'continue_here'],
        userId: user.id
      });
    }
  
    req.session.userId = user.id;
    await setUserSessionId(user.id, req.sessionID);
    res.json({ message: 'Login successful' });
  };
  
  export const resolveSession = async (req, res) => {
    const { userId, action } = req.body;
    const oldSessionId = await getUserSessionId(userId);
  
    if (action === 'logout_other') {
      await destroySessionById(oldSessionId);
      await setUserSessionId(userId, req.sessionID);
      req.session.userId = userId;
      return res.json({ message: 'Old session logged out. Logged in here.' });
    } else if (action === 'continue_here') {
      await setUserSessionId(userId, req.sessionID);
      req.session.userId = userId;
      return res.json({ message: 'Continuing in this session.' });
    }
  
    res.status(400).json({ message: 'Invalid action' });
  };
  