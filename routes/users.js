var express = require("express");
var router = express.Router();

const User = require("../models/User");
const { checkBody } = require("../modules/checkBody");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");

//
router.post("/signup", (req, res) => {
  if (!checkBody(req.body, ["username", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  User.findOne({ username: req.body.username }).then((data) => {
    if (data === null) {

      const newUser = new User({
        firstname: req.body.firstname,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        token: uid2(32),
      });
      newUser.save().then((newDoc) => {
        console.log(newDoc)
        res.json({ result: true, user: newDoc });
      });
    } else {
      res.json({ result: false, error: "User already exists" });
    }
  });
});

//
router.post("/signin", (req, res) => {
  if (!checkBody(req.body, ["username", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  User.findOne({ username: req.body.username }).then((data) => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      console.log(data)
      res.json({ result: true, user: data });
    } else {
      res.json({ result: false, error: "User not found or wrong password" });
    }
  });
});

module.exports = router;
