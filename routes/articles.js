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

// Create Article
router.post(
  "/articles",
  celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.string().required(),
      source: Joi.string().required(),
      link: Joi.string()
        .uri({ scheme: ["http", "https"] })
        .required(),
      image: Joi.string()
        .uri({ scheme: ["http", "https"] })
        .required(),
    }),
  }),
  createArticle
);

// Delete Article
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
