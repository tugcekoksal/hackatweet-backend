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







// Importe le module Express pour créer une application web avec Node.js
var express = require("express");

// Crée un nouvel objet Router qui permet de définir des routes dans votre application
var router = express.Router();

// Importe le modèle Tweet depuis le dossier models, qui est utilisé pour interagir avec la collection de tweets dans la base de données
const Tweet = require("../models/Tweet");

// Définit une route GET sur l'URL '/tweets'. Cette route sera utilisée pour récupérer des données.
// 'async' indique que la fonction est asynchrone, permettant l'utilisation de 'await' pour les opérations asynchrones
router.get('/tweets', async (req, res) => {
    // Récupère tous les tweets de la base de données. 'await' attend que cette opération asynchrone soit terminée.
    // 'populate' remplit les champs référencés (ici 'author' et 'likes') avec les données complètes des documents référencés au lieu de seulement leurs ID
    const tweets = await Tweet.find().populate('author').populate('likes');

    // Envoie les tweets récupérés au client sous forme de JSON
    res.json(tweets);
});

// Exporte le router pour qu'il puisse être utilisé dans d'autres parties de l'application, typiquement dans le fichier principal de l'application (comme app.js)
module.exports = router;








var express = require("express");
var router = express.Router();

const Tweet = require("../models/Tweet");

router.get('/tweets', async (req, res) => {
    const tweets = await Tweet.find().populate('author').populate('likes');
    res.json(tweets);
});

module.exports = router;




















// Route POST pour créer un nouveau tweet
router.post('/tweet', async (req, res) => {
    // Crée une nouvelle instance de Tweet en utilisant les données reçues dans req.body
    const newTweet = new Tweet({
        content: req.body.content,
        author: req.body.author,
        hashtags: req.body.hashtags,
        likes: req.body.likes // Ceci est optionnel, car les likes pourraient être ajoutés plus tard
    });
  
    // Sauvegarde le nouveau tweet dans la base de données
    const savedTweet = await newTweet.save();
    // Envoie le tweet sauvegardé au client avec un statut 201 (Created)
    res.status(301).json(savedTweet);
  });
  
  
  
  
  
  
  
  router.post('/tweet', async (req, res) => {
  
    const newTweet = new Tweet({
        content: req.body.content,
        author: req.body.author,
        hashtags: req.body.hashtags,
        likes: req.body.likes
    });
  
  
    const savedTweet = await newTweet.save();
    res.status(301).json(savedTweet);
  });