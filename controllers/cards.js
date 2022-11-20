const card = require('../models/card');

const ERROR_CODE_404 = 404;
const ERROR_CODE_500 = 500;

module.exports.getCards = (req, res) => {
  card.find(req.params)
    .then((cardsData) => {
      res.send({ data: cardsData });
    })
    .catch((err) => {
      res.status(ERROR_CODE_404).send({ message: `Ошибка при поиске карточек - ${err}` });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  card.create({ name, link, owner: req.user._id })
    .then((cardData) => {
      res.send({ data: cardData });
    })
    .catch((err) => {
      res.status(ERROR_CODE_500).send({ message: `Ошибка при создании карточки - ${err}` });
    });
};

module.exports.deleteCard = (req, res) => {
  card.findByIdAndRemove(req.params.cardId)
    .then((cardData) => {
      res.send({ data: cardData });
    })
    .catch((err) => {
      res.status(ERROR_CODE_500).send({ message: `Ошибка удаления карточки ${err}` });
    });
};

module.exports.likeCard = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((cardData) => {
      res.send({ data: cardData });
    })
    .catch((err) => {
      res.status(ERROR_CODE_500).send({ message: `Ошибка добавления лайка ${err}` });
    });
};

module.exports.dislikeCard = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((cardData) => {
      res.send({ data: cardData });
    })
    .catch((err) => {
      res.status(ERROR_CODE_500).send({ message: `Ошибка удаления лайка ${err}` });
    });
};
