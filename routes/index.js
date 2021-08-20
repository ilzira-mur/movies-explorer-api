const router = require('express').Router();
const authRouter = require('./auth');
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');
const NotFoundResourceMessage = require('../configs/constants');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
router.use(authRouter);
router.use(userRouter);
router.use(movieRouter);
router.use(auth);
router.use('*', (req, res, next) => {
  next(new NotFoundError(NotFoundResourceMessage));
});

module.exports = router;
