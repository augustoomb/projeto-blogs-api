const jwtTokenHelpers = require('../helpers/jwtTokenHelpers');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const data = jwtTokenHelpers.verifyToken(authorization);
    req.email = data.email;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { auth };