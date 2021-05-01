const { JWT_SECRET, NODE_ENV } = process.env;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const NotFoundError = require("../errors/NotFoundError");

// Get Current User
const getCurrenUser = (req, res, next) => {
  return User.findById({ _id: req.user._id })
    .then((user) => {
      if (!user) throw new NotFoundError("User not found");
      return res.status(200).send({
        _id: user._id,
        email: user.email,
        name: user.name,
      });
    })
    .catch(next);
};

// Login Handler
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (user) {
        res.status(200).send({
          token: jwt.sign(
            { _id: user._id },
            process.env.NODE_ENV === "production"
              ? process.env.JWT_SECRET
              : "secret-string",
            {
              expiresIn: "7d",
            }
          ),
        });
      }
    })
    .catch(next);
};

// Create User Handler
const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  return bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        email: user.email,
      });
    })
    .catch(next);
};

module.exports = {
  getCurrenUser,
  login,
  createUser,
};
