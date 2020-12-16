const jwt = require('jsonwebtoken');
exports.GenerateToken = (_id) => jwt.sign({ _id }, 'supersecretkey', { expiresIn: '24h' });
exports.DecodeToken = (token) => jwt.decode(token);