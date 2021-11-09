const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/NotFoundError');
const FaultRequest = require('../errors/FaultRequest');
const InternalServerError = require('../errors/InternalServerError');
const ConflicRequest = require('../errors/ConflicRequest');
const Unauthorized = require('../errors/Unauthorized');
const User = require('../models/user');
const { NODE_ENV, JWT_SECRET } = require('../configs/index');
const {
  ConflicRequestMessage,
  FaultRequestMessage,
  InternalServerErrorMessage,
  NotFoundErrorMessage,
} = require('../configs/constants');

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.send({
      name: user.name,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflicRequest(ConflicRequestMessage));
      }
      if (err.name === 'ValidationError') {
        next(new FaultRequest(FaultRequestMessage));
      }
    })
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new FaultRequest(FaultRequestMessage));
      } else {
        next(new InternalServerError(InternalServerErrorMessage`${err.message}`));
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'PrivateKey', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      next(new Unauthorized(err.message));
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NotFoundErrorMessage);
      } else {
        return res.send(user);
      }
    })
    .catch((err) => {
      next(new InternalServerError(InternalServerErrorMessage`${err.message}`));
    })
    .catch(next);
};

module.exports = {
  createUser,
  updateUserInfo,
  login,
  getUser,
};
