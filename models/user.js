const mongoose = require("mongoose");
const validator = require("validator");
// const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: "Wrong Email Format",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: "Denis",
  },
});

// models/user.js

// userSchema.statics.findUserByCredentials = function findUserByCredentials(
//   email,
//   password
// ) {
//   return this.findOne({ email })
//     .select("+password")
//     .then((user) => {
//       if (!user) {
//         return Promise.reject(new Error("Incorrect email or password"));
//       }

//       return bcrypt.compare(password, user.password).then((matched) => {
//         if (!matched) {
//           return Promise.reject(new Error("Incorrect email or password"));
//         }

//         return user;
//       });
//     });
// };

module.exports = mongoose.model("user", userSchema);
