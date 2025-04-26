const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.headers['x-access-token'] || req.query.token;
  
  if (!token) {
    return res.status(403).json({ 
      success: false,
      message: 'token no proporcionado' 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'tokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: 'token expirado' 
      });
    }
    return res.status(401).json({ 
      success: false,
      message: 'token inválido' 
    });
  }
};

module.exports = { verifyToken };