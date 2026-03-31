// Importation du framework Express.js pour créer l'application web
const express = require('express');

// Importation du pilote MySQL2 utilisé pour interroger la base de données MySQL
const mysql2 = require('mysql2');

// Importation du middleware pour se connecter à la base de données MySQL
// "pool" est la stratégie de connexion à la base de données pour optimiser les performances
const myConnection = require('express-myconnection');

// Initialisation de l'application Express
const app = express();

// Middleware pour pouvoir lire le corps des requêtes en format JSON
app.use(express.json());

// Middleware pour pouvoir lire le corps des requêtes en format URL-encoded
app.use(express.urlencoded({extended: true}));

// Configuration des options de connexion à la base de données MySQL
const optionsConnexionBaseDeDonnees = {
    host: "localhost",                          // Hôte de la base de données
    user:"root",                                // Utilisateur MySQL
    password: "Lidyamoussa2907!",               // Mot de passe MySQL
    database: "maygourmet",                     // Nom de la base de données
    port: 3306                                  // Port MySQL par défaut
};

// Utilisation du middleware myConnection pour gérer les connexions à la base de données
app.use(myConnection(mysql2, optionsConnexionBaseDeDonnees, "pool"));

// Configuration du dossier contenant les fichiers de vues (templates EJS)
app.set('views', './views');

// Configuration du moteur de vue EJS pour le rendu des templates HTML dynamiques
app.set('view engine', 'ejs');

// Configuration du dossier contenant les fichiers statiques (CSS, images, JS côté client)
app.use(express.static('Publique'));

// ====================================
// ROUTE GET - PAGE RACINE
// ====================================
// Route pour la page racine : localhost:3004/
app.get('/', (req, res) => {
    // Affiche un message de bienvenue sur la page racine
   res.write("<h1>Bienvenue chez MayGourmet !</h1>");
   res.end();
});

// ====================================
// ROUTE GET - PAGE ACCUEIL
// ====================================
// Route pour afficher la page d'accueil du site
app.get('/api/accueil', (req, res) => {
    // Log dans la console pour vérifier le passage dans cette route
    console.log("Je passe dans /api/accueil");
    
    // Rendu du template EJS 'accueil.ejs' pour afficher la page d'accueil
    res.render('accueil');
});


// Exportation de l'application pour l'utiliser dans serveur.js
module.exports = app;