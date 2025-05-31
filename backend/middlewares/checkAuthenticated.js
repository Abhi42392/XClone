import jwt from 'jsonwebtoken';


const checkAuthenticated = async (req, res, next) => {
  // Check for JWT token (normal login)
  const token = req.headers.token;
  
  
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id; // Attach user to request
      
      return next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  }

  // Check for Google OAuth session login
  if (req.isAuthenticated?.() && req.user) {
    return next();
  }
  return res.status(401).json({ error: 'Not authenticated' });
};

export default checkAuthenticated;
