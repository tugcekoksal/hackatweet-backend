const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    // unique: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },
  // photo: {
  //   type: String,
  //   default: "",
  // },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  token: {
    type: String,
  },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
