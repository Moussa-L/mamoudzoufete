// Fichier serveur.js - Point d'entrée du serveur Node.js pour l'application MayGourmet

// Importation du module HTTP natif de Node.js pour créer un serveur web
const http = require('http');

// Importation de l'application Express définie dans app.js
const app = require('./app');

// Définition du numéro de port sur lequel le serveur va écouter
const numPort = 3007;

// Configuration du port dans l'application Express
app.set('port', numPort);

// Création du serveur HTTP en passant l'application Express comme gestionnaire de requêtes
const server = http.createServer(app);

// Démarrage du serveur : il écoute sur le port défini et affiche un message de confirmation
server.listen(numPort, () => {
    // Message de confirmation dans la console indiquant que le serveur est opérationnel
    console.log("Le serveur est démarré sur le port ", numPort);
});