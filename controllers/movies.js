const NotFoundError = require('../errors/NotFoundError');
const FaultRequest = require('../errors/FaultRequest');
const InternalServerError = require('../errors/InternalServerError');
const Movie = require('../models/movie');
const Forbidden = require('../errors/Forbidden');
const {
  FaultRequestMessage,
  ForbiddenMessage,
  InternalServerErrorMessage,
  NotFoundErrorMessage,
} = require('../configs/constants');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => {
      next(new InternalServerError(InternalServerErrorMessage`${err.message}`));
    });
};

const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailer,
    thumbnail, nameRU, nameEN, movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new FaultRequest(FaultRequestMessage));
      } else {
        next(new InternalServerError(InternalServerErrorMessage`${err.message}`));
      }
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError(NotFoundErrorMessage);
    })
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        Movie.findByIdAndRemove(req.params.movieId)
          .then((movieDelete) => {
            res.send(movieDelete);
          })
          .catch((err) => {
            next(new InternalServerError(InternalServerErrorMessage`${err.message}`));
          })
          .catch(next);
      } else {
        throw new Forbidden(ForbiddenMessage);
      }
      return res.send({ message: 'Фильм удален' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError(NotFoundErrorMessage));
      }
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
