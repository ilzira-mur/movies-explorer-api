const NotFoundError = require('../errors/NotFoundError');
const FaultRequest = require('../errors/FaultRequest');
const InternalServerError = require('../errors/InternalServerError');
const Movie = require('../models/movie');
const Forbidden = require('../errors/Forbidden');

const getMovies = (req, res) => {
  Movie.find({})
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch((err) => {
      throw new InternalServerError(`Ошибка - ${err.message}`);
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
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new FaultRequest('Переданы некорректные данные при создании записи о фильме.');
      } else {
        throw new InternalServerError(`Ошибка - ${err.message}`);
      }
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError('Фильм с указанным _id не найден.');
    })
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        Movie.findByIdAndRemove(req.params.movieId)
        // eslint-disable-next-line no-shadow
          .then((card) => {
            res.status(200).send(card);
          })
          .catch((err) => {
            if (err.name === 'CastError') {
              throw new NotFoundError('Фильм с указанным _id не найден.');
            }
            throw new InternalServerError(`Ошибка - ${err.message}`);
          })
          .catch(next);
      } else {
        throw new Forbidden('Недостаточно прав');
      }
      return res.status(200).send({ message: 'Фильм удален' });
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
