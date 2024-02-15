const mongoose = require('mongoose');


const tweetSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    maxlength: 280
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, // Définit le type de champ comme un ObjectId de Mongoose
    ref: 'User', // Référence le modèle User pour lier cet ObjectId
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  hashtags: [String], // Utilise un tableau de chaînes de caractères pour stocker les hashtags
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Utilise un tableau d'ObjectIds pour stocker les likes
});


const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;