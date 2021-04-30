// const { JWT_SECRET, NODE_ENV } = process.env;
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
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

module.exports = {
  getCurrenUser,
};
