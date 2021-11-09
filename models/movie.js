const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator(link) {
        return isURL(link);
      },
      message: 'Ошибка URL',
    },
    required: true,
  },
  trailer: {
    type: String,
    validate: {
      validator(link) {
        return isURL(link);
      },
      message: 'Ошибка URL',
    },
    required: true,
  },
  thumbnail: {
    type: String,
    validate: {
      validator(link) {
        return isURL(link);
      },
      message: 'Ошибка URL',
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model('movie', movieSchema);
