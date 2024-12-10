import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.adminToken || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Authentication token required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Assuming token contains user data (e.g., id, username, isAdmin)
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, (err) => {
      if (err) return res.status(401).json({ error: 'Unauthorized' });
      if (req.user?.isAdmin) {
        next();
      } else {
        res.status(403).json({ error: 'Access denied. Admins only.' });
      }
    });
  };
  
