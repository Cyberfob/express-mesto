const constants = require('http2');

const card = require('../models/card');

module.exports.getCards = (req, res) => {
  card.find(req.params)
    .then((cardsData) => {
      if (cardsData) {
        return res.send({ data: cardsData });
      }
      throw new Error('Нет карточек');
    })
    .catch((err) => {
      if (err.message === 'Нет карточек') {
        res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: `Ошибка при поиске карточек - ${err}` });
      } else {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: `Ошибка сервера - ${err}` });
      }
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  card.create({ name, link, owner: req.user._id })
    .then((cardData) => {
      if (cardData) {
        res.send({ data: cardData });
      } else {
        throw new Error('Ошибка в теле запроса');
      }
    })
    .catch((err) => {
      if (err.message === 'Ошибка в теле запроса') {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Ошибка в теле запроса' });
      } else {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: `Ошибка сервера - ${err}` });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  card.findByIdAndRemove(req.params.cardId)
    .then((cardData) => {
      if (cardData) {
        res.send({ data: cardData });
      } else {
        throw new Error('Ошибка в теле запроса');
      }
    })
    .catch((err) => {
      if (err.message === 'Ошибка в теле запроса') {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Ошибка в теле запроса' });
      } else {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: `Ошибка сервера - ${err}` });
      }
    });
};
module.exports.likeCard = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((cardData) => {
      if (cardData) {
        res.send({ data: cardData });
      } else {
        throw new Error('Ошибка в теле запроса');
      }
    })
    .catch((err) => {
      if (err.message === 'Ошибка в теле запроса') {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Ошибка в теле запроса' });
      } else {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: `Ошибка сервера - ${err}` });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((cardData) => {
      if (cardData) {
        res.send({ data: cardData });
      }
    })
    .catch((err) => {
      if (err.message === 'Ошибка в теле запроса') {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Ошибка в теле запроса' });
      } else {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: `Ошибка сервера - ${err}` });
      }
    });
};
