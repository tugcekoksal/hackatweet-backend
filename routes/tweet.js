var express = require("express");
var router = express.Router();

const Tweet = require("../models/Tweet");

router.post("/", (req, res) => {
  const newTweet = new Tweet({
    content: req.body.content,
    username: req.body.username,
    firstname: req.body.firstname,
    hashtags: req.body.hashtags,
  });
  newTweet
    .save()
    .then((data) => {
      res.json({ result: true,tweet:data });
    })
    .catch((error) => {
      console.error("Error saving tweet:", error);
      res.status(500).json({ result: false, error: "Failed to save tweet" });
    });
});

router.get("/", async (req, res) => {
  const tweets = await Tweet.find().populate("content").populate("hashtags");
  res.json(tweets);
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    // Récupère l'ID du tweet à supprimer depuis les paramètres de l'URL
    const tweetId = req.params.id;

    // Supprime le tweet spécifique en utilisant son ID
    const result = await Tweet.findByIdAndDelete(tweetId);

    // Si aucun tweet n'est trouvé avec cet ID, renvoie une réponse indiquant que l'élément est introuvable
    if (!result) {
      return res.status(404).json({ message: "Tweet not found" });
    }

    // Envoie une réponse indiquant que la suppression a été réussie
    res.json({ message: "Tweet successfully deleted" });
  } catch (error) {
    // Envoie une réponse en cas d'erreur
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
