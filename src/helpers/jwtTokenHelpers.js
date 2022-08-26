const jwt = require('jsonwebtoken');
require('dotenv').config();

// const JWT_SECRET = 'umaSenhaParaProjeto';
const { JWT_SECRET } = process.env;
const JWT_CONFIG = { algorithm: 'HS256', expiresIn: '7d' };

const createToken = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, JWT_CONFIG);
  return token;
};

const verifyToken = (token) => {
  const dados = jwt.verify(token, JWT_SECRET);
  return dados;
};

module.exports = { createToken, verifyToken };