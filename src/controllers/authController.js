import bcrypt from 'bcryptjs';
import redisClient from '../sessions/redisClient.js';

const users = [
  { id: '1', username: 'manisha', password: bcrypt.hashSync('1234', 10) }
];

const SESSION_KEY_PREFIX = 'user-session:';

export const login = async (req, res) => {
  const { username, password, force } = req.body;
  const user = users.find(u => u.username === username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const existingSessionId = await redisClient.get(`${SESSION_KEY_PREFIX}${user.id}`);

  if (existingSessionId && !force) {
    return res.status(409).json({
      message: 'Already logged in elsewhere',
      options: ['Force login', 'Cancel']
    });
  }

  if (existingSessionId && force) {
    await redisClient.del(`sess:${existingSessionId}`);
  }

  await redisClient.set(`${SESSION_KEY_PREFIX}${user.id}`, req.sessionID);
  req.session.userId = user.id;

  res.json({ message: 'Login successful' });
};

export const logout = async (req, res) => {
  const userId = req.session.userId;
  await redisClient.del(`${SESSION_KEY_PREFIX}${userId}`);
  req.session.destroy(() => {
    res.json({ message: 'Logged out' });
  });
};

export const viewDashboard =(req,res)=>{
    console.log("test");
    
}