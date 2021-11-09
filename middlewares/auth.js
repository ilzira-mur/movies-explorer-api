const jwt = require('jsonwebtoken');
const { UnauthorizedMessage } = require('../configs/constants');

const { NODE_ENV, JWT_SECRET } = require('../configs/index');
const Unauthorized = require('../errors/Unauthorized');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new Unauthorized(UnauthorizedMessage);
    }
    let payload;
    const token = authorization.replace('Bearer ', '');
    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'PrivateKey');
    } catch (err) {
      next(new Unauthorized(UnauthorizedMessage));
    }
    req.user = payload;
  } catch (err) {
    next(err);
  }
  next();
};

module.exports = auth;
