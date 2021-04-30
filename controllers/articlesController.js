const Article = require("../models/article");
const NotFoundError = require("../errors/NotFoundError");
const UnauthorizedError = require("../errors/UnauthorizedError");

const getArticles = (req, res, next) => {
  return Article.find({})
    .then((articles) => res.status(200).send(articles))
    .catch(next);
};

const createArticle = (req, res, next) => {
  Article.create({ ...req.body, owner: req.user._id })
    .then((article) => {
      res.status(201).send(article);
    })
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  Article.findById({ _id: req.params.articleId })
    .then((article) => {
      if (!article) {
        throw new NotFoundError("Card not found");
      } else if (!article.owner._id === req.user._id) {
        throw new UnauthorizedError("Forbidden");
      } else {
        Article.findByIdAndDelete({ _id: req.params.articleId }).then(() => {
          res
            .status(200)
            .send({ message: "This Card has been succesfully deleted" });
        });
      }
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
