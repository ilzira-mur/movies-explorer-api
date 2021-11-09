const authRouter = require('express').Router();
const { login, createUser } = require('../controllers/users');
const { validationLogin, validationCreateUser } = require('../middlewares/celebrateValidation');

authRouter.post('/signin', validationLogin, login);

authRouter.post('/signup', validationCreateUser, createUser);

module.exports = authRouter;
