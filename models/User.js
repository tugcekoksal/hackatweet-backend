const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Importe la bibliothèque bcrypt pour le hashage des mots de passe


const userSchema = new mongoose.Schema({
  firstname: {
    type: String, 
    required: true, 
    trim: true 
  },
  username: {
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  },
  email: {
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  },
  passwordHash: {
    type: String, 
    required: true 
  },
  photo: {
    type: String, 
    default: '' 
  },
  createdAt: {
    type: Date, 
    default: Date.now 
  }
});

// Middleware pour hasher le mot de passe avant de sauvegarder l'utilisateur
userSchema.pre('save', async function(next) {
  if (!this.isModified('passwordHash')) return next(); // Vérifie si le mot de passe a été modifié

  try {
    const salt = await bcrypt.genSalt(10); // Génère un sel pour le hashage du mot de passe
    const hash = await bcrypt.hash(this.passwordHash, salt); // Hashage du mot de passe
    this.passwordHash = hash; // Attribue le mot de passe hashé au champ passwordHash
    next(); // Poursuit le middleware
  } catch (error) {
    next(error); // Gère les erreurs
  }
});


const User = mongoose.model('User', userSchema);

module.exports = User;