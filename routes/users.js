const userRouter = require('express').Router();
const auth = require('../middlewares/auth');
const { getUser, updateUserInfo } = require('../controllers/users');
const { validationGetUser, validationUpdateUserInfo } = require('../middlewares/celebrateValidation');

userRouter.get('/users/me', auth, validationGetUser, getUser);

userRouter.patch('/users/me', auth, validationUpdateUserInfo, updateUserInfo);

module.exports = userRouter;
