const express = require("express");
const { celebrate, Joi } = require("celebrate");

const router = express.Router();
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require("../controllers/articlesController");

// Get All Articles
router.get("/cards", getArticles);

// Create CArticle
router.post(
  "/cards",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string()
        .uri({ scheme: ["http", "https"] })
        .required(),
    }),
  }),
  createArticle
);

// Delete Card
router.delete(
  "/cards/:articleId",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  }),
  deleteArticle
);

module.exports = router;
