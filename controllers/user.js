const usersSchema = require('../models/user');

const ERROR_CODE_400 = 400;
const ERROR_CODE_404 = 404;
const ERROR_CODE_500 = 500;

module.exports.getAllUsers = (req, res) => {
  usersSchema.find(req.params)
    .then((userData) => {
      if (!userData) {
        res.status(ERROR_CODE_400).send({ message: 'Нет пользователей' });
      }
      res.send({ data: userData });
    })
    .catch((err) => { res.status(ERROR_CODE_404).send({ message: `Ошибка поиска пользователей ${err}` }); });
};

module.exports.getUser = (req, res) => {
  if (!req.params.userId) {
    res.status(ERROR_CODE_400).send({ message: 'Ошибка при отправке запроса' });
    return;
  }
  usersSchema.findById(req.params.userId)
    .then((userData) => {
      if (!userData) {
        res.status(ERROR_CODE_404).send({ message: 'Ошибка при отправке запроса' });
        return;
      }
      res.send({ data: userData });
    })
    .catch((err) => { res.status(ERROR_CODE_404).send({ message: `Такого пользователя не существует ${err}` }); });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  if (!name || !about || !avatar) {
    res.status(ERROR_CODE_400).send({ message: 'Ошибка в теле запроса' });
    return;
  }

  usersSchema.create({ name, about, avatar })
    .then((userData) => res.send({ data: userData }))
    .catch((err) => { res.status(ERROR_CODE_404).send({ message: `Ошибка при создании пользователя ${err}` }); });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  if (!name || !about) {
    res.status(ERROR_CODE_400).send({ message: 'Ошибка в теле запроса' });
    return;
  }

  usersSchema.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((userData) => res.send({ data: userData }))
    .catch((err) => { res.status(ERROR_CODE_500).send({ message: `Ошибка при изменении данных пользователя - ${err}` }); });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  if (!avatar) {
    res.status(ERROR_CODE_400).send({ message: 'Ошибка в теле запроса' });
    return;
  }

  usersSchema.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((userData) => res.send({ data: userData }))
    .catch((err) => { res.status(ERROR_CODE_500).send({ message: `Ошибка при изменении данных пользователя - ${err}` }); });
};
