const express = require("express");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();
const { celebrate, Joi } = require("celebrate");
const { errors } = require("celebrate");

const { requestLogger, errorLogger } = require("./middleware/logger");
const auth = require("./middleware/auth");

const usersRouter = require("./routes/users");
const articleRouter = require("./routes/articles");

const { createUser, login } = require("./controllers/usersController");

const conflictError = require("./errors/conflictError");
const NotFoundError = require("./errors/NotFoundError");

const app = express();
const {
  PORT = 3000,
  DATABASEURL = "mongodb://localhost:27017/newsdb",
} = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(cors());
app.options("*", cors());
app.use(requestLogger);
// app.use(limiter);
app.use(express.json());
app.use(helmet());

mongoose.connect(DATABASEURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().required().min(2),
    }),
  }),
  createUser
);

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login
);

app.use("/", auth, usersRouter);
app.use("/", auth, articleRouter);

app.use("*", (req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

app.use(errorLogger);

app.use(errors());

app.use(conflictError);

app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`);
});
