export const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
      return next(); // User is authenticated, continue
    }
    res.status(401).json({ message: 'Unauthorized access' });
  };
  