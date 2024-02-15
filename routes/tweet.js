var express = require("express");
var router = express.Router();

const Tweet = require("../models/Tweet");

router.post("/tweet", (req, res) => {
  const newTweet = new Tweet({
    content: req.body.content,
    author: req.body.author,
    hashtags: req.body.hashtags,
  });
  newTweet
    .save()
    .then(() => {
      res.json({ result: true });
    })
    .catch((error) => {
      console.error("Error saving tweet:", error);
      res.status(500).json({ result: false, error: "Failed to save tweet" });
    });
});

router.get("/tweets", async (req, res) => {
  const tweets = await Tweet.find().populate("content").populate("hashtags");
  res.json(tweets);
});

//delete
router.delete("/tweet/:id", async (req, res) => {
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

// Route POST pour créer un nouveau tweet
router.post("/tweet", async (req, res) => {
  // Crée une nouvelle instance de Tweet en utilisant les données reçues dans req.body
  const newTweet = new Tweet({
    content: req.body.content,
    author: req.body.author,
    hashtags: req.body.hashtags,
    likes: req.body.likes, // Ceci est optionnel, car les likes pourraient être ajoutés plus tard
  });

  // Sauvegarde le nouveau tweet dans la base de données
  const savedTweet = await newTweet.save();
  // Envoie le tweet sauvegardé au client avec un statut 201 (Created)
  res.status(301).json(savedTweet);
});

router.post("/tweet", async (req, res) => {
  const newTweet = new Tweet({
    content: req.body.content,
    author: req.body.author,
    hashtags: req.body.hashtags,
    likes: req.body.likes,
  });

  const savedTweet = await newTweet.save();
  res.status(301).json(savedTweet);
});
