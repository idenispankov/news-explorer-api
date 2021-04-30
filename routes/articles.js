const express = require("express");
const { celebrate, Joi } = require("celebrate");

const router = express.Router();
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require("../controllers/articlesController");

// Get All Articles
router.get("/articles", getArticles);

// Create CArticle
router.post(
  "/",
  celebrate({
    body: Joi.object()
      .keys({
        keyword: Joi.string().required(),
        title: Joi.string().required(),
        text: Joi.string().required(),
        date: Joi.string().required(),
        source: Joi.string().required(),
        link: Joi.string().required().uri(),
        image: Joi.string().required().uri(),
      })
      .unknown(false),
  }),
  createArticle
);

// Delete Card
router.delete(
  "/articles/:articleId",
  celebrate({
    params: Joi.object().keys({
      articleId: Joi.string().hex().length(24),
    }),
  }),
  deleteArticle
);

module.exports = router;
