const movieRouter = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');
const { validationCreateMovie, validationDeleteMovie } = require('../middlewares/celebrateValidation');

movieRouter.get('/movies', auth, getMovies);

movieRouter.post('/movies', auth, validationCreateMovie, createMovie);

movieRouter.delete('/movies/:movieId', auth, validationDeleteMovie, deleteMovie);

module.exports = movieRouter;
