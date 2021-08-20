const ConflicRequestMessage = 'Пользователь с таким email есть в системе';
const FaultRequestMessage = 'Переданы некорректные данные';
const ForbiddenMessage = 'Недостаточно прав';
const InternalServerErrorMessage = 'На сервере произошла ошибка: ';
const NotFoundErrorMessage = 'Объект с указанным _id не найден';
const NotFoundResourceMessage = 'Ресурс не найден';
const UnauthorizedMessage = 'Необходима авторизация';
const UnauthorizedEmailMessage = 'Неправельная почта';
const UnauthorizedPasswordMessage = 'Неправельный пароль';
const mongoDbLocal = 'mongodb://localhost:27017/bitfilmsdb';
const allowedCors = [
  'http://oops.nomoredomains.club',
  'https://oops.nomoredomains.club',
  'http://localhost:3000',
  'https://localhost:3000',
];
const defaultAllowedMethods = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  ConflicRequestMessage,
  FaultRequestMessage,
  ForbiddenMessage,
  InternalServerErrorMessage,
  NotFoundErrorMessage,
  NotFoundResourceMessage,
  UnauthorizedMessage,
  UnauthorizedEmailMessage,
  UnauthorizedPasswordMessage,
  mongoDbLocal,
  allowedCors,
  defaultAllowedMethods,
};
