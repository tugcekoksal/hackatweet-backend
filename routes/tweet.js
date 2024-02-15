var express = require("express");
var router = express.Router();

const Tweet = require("../models/Tweet");

router.post("/twitter", async (req, res) => {
  const newTweet = new Tweet({
    content: req.body.content,
    author: req.body.author,
    hashtags: req.body.hashtags,
    likes: req.body.likes,
  });
});

module.exports = router;
