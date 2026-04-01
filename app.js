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
app.use(express.static('public'));

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




// ====================================
// ROUTE GET - PAGE compte
// ====================================
// Route pour afficher la page de compte utilisateur
app.get('/api/compte', (req, res) => {
    // Log dans la console pour vérifier le passage dans cette route
    console.log("Je passe dans /api/compte");

    // Rendu du template EJS 'compte.ejs' pour afficher la page de compte utilisateur
    res.render('compte', { message: undefined, error: undefined });
});

// ====================================
// ROUTE POST - INSCRIPTION COMPTE
// ====================================
// Route pour traiter l'inscription d'un nouveau compte
app.post('/api/compte', (req, res) => {
    console.log("Traitement de l'inscription");

    const { nom, prenom, mail, numero, adresse, mot_de_passe } = req.body;

    // Validation basique
    if (!nom || !prenom || !mail || !numero || !mot_de_passe) {
        return res.render('compte', { message: 'Tous les champs obligatoires doivent être remplis.', error: true });
    }

    // Vérifier si l'email existe déjà
    req.getConnection((err, connection) => {
        if (err) {
            console.error('Erreur de connexion à la base de données:', err);
            return res.render('compte', { message: 'Erreur serveur.', error: true });
        }

        const checkEmailQuery = 'SELECT id FROM compte WHERE mail = ?';
        connection.query(checkEmailQuery, [mail], (err, results) => {
            if (err) {
                console.error('Erreur lors de la vérification de l\'email:', err);
                return res.render('compte', { message: 'Erreur serveur.', error: true });
            }

            if (results.length > 0) {
                return res.render('compte', { message: 'Cet email est déjà utilisé.', error: true });
            }

            // Insérer le nouveau compte
            const insertQuery = 'INSERT INTO compte (nom, prenom, mail, numero, adresse, mot_de_passe) VALUES (?, ?, ?, ?, ?, ?)';
            connection.query(insertQuery, [nom, prenom, mail, numero, adresse || '', mot_de_passe], (err, result) => {
                if (err) {
                    console.error('Erreur lors de l\'insertion:', err);
                    return res.render('compte', { message: 'Erreur lors de l\'inscription.', error: true });
                }

                console.log('Inscription réussie pour:', mail);
                res.render('compte', { message: 'Inscription réussie ! Vous pouvez maintenant vous connecter.' });
            });
        });
    });
});




// ====================================
// ROUTE GET - PAGE contact
// ====================================
// Route pour afficher la page de contact
app.get('/api/contact', (req, res) => {
    // Log dans la console pour vérifier le passage dans cette route
    console.log("Je passe dans /api/contact");

    // Rendu du template EJS 'contact.ejs' pour afficher la page de contact
    res.render('contact');
});





// ====================================
// ROUTE GET - PAGE entreprise
// ==================================== 
// Route pour afficher la page de l'entreprise
app.get('/api/entreprise', (req, res) => {
    // Log dans la console pour vérifier le passage dans cette route
    console.log("Je passe dans /api/entreprise");

    // Rendu du template EJS 'entreprise.ejs' pour afficher la page de l'entreprise
    res.render('entreprise');
});



// ====================================
// ROUTE GET - PAGE ÉQUIPE (LECTURE)
// ====================================
// Route pour afficher la page de l'équipe avec tous les membres
app.get("/api/equipe", (req, res) => {
    // Log dans la console pour vérifier le passage dans cette route
    console.log("Je suis passé dans /api/equipe");

    // Récupération de la connexion à la base de données
    req.getConnection((erreur, connection) => {
        // Gestion de l'erreur de connexion
        if(erreur) {
            console.log(erreur);
            return res.status(500).send("Erreur DB");
        } 
        
        // Exécution de la requête SQL pour récupérer tous les membres de l'équipe
        connection.query("SELECT * FROM equipe", [], (err, resultatEquipe) => {
            // Gestion de l'erreur de requête
            if (err) {
                console.log("Erreur dans la requete SQL ", err);
                return res.status(500).send("Erreur SQL");
            } 
            
            // Rendu du template EJS 'equipe' avec les données récupérées
            res.render("equipe", {resultatEquipe});
        });
    });
});



// ====================================
// ROUTE POST - AJOUT MEMBRE ÉQUIPE (CRÉATION)
// ====================================
// Route pour ajouter un nouveau membre à l'équipe dans la table "equipe" de la BD
app.post('/api/equipe', (req, res) => {
    // Extraction des données du formulaire depuis le corps de la requête
    const nomMembreEquipe = req.body.nomMembreEquipe;
    const prenomMembreEquipe = req.body.prenomMembreEquipe;
    const mailMembreEquipe = req.body.mailMembreEquipe;
    const telephoneMembreEquipe = req.body.telephoneMembreEquipe;
    const posteMembreEquipe = req.body.posteMembreEquipe;
    const adresseMembreEquipe = req.body.adresseMembreEquipe;
    
    
    // Requête SQL pour insérer un nouveau membre dans la table equipe
    const SQL = "INSERT INTO equipe(nom, prenom, mail, telephone, poste, poste, ) VALUES (?, ?, ?, ?, ?, ?)";

    // Tableau contenant les valeurs à insérer dans la requête SQL (ordre important)
    const ordreChamps = [nomMembreEquipe, prenomMembreEquipe, mailMembreEquipe, telephoneMembreEquipe, posteMembreEquipe, adresseMembreEquipe];

    // Récupération de la connexion à la base de données
    req.getConnection((erreur, connection) => {
        // Gestion de l'erreur de connexion
        if(erreur) {
            console.log("Erreur de connexion à la base de données : ", erreur);
        } else {
            // Exécution de la requête INSERT avec les données du formulaire
            connection.query(SQL, ordreChamps, (err,nouveauxMembres) => {
                // Gestion de l'erreur de requête
                if (err) {
                    console.log("Erreur d'ajout d'un membre : ", err);
                } else {
                    // Succès de l'ajout - log et redirection
                    console.log("BRAVO! Membre de l'équipe ajouté avec succès : ", err);
                    res.status(302).redirect("/api/acceuil");
                }
            });
        }       
    });
});






// Exportation de l'application pour l'utiliser dans serveur.js
module.exports = app;