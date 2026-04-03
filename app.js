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
    database: "mamoudzoufete",                     // Nom de la base de données
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
// ROUTE POST - PAGE CONTACT
// ====================================
// Route pour traiter l'envoi du formulaire de contact
app.post('/api/contact', (req, res) => {
    // Log dans la console pour vérifier le passage dans cette route
    console.log("Traitement du formulaire de contact");

    // Extraction des données du formulaire depuis le corps de la requête
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const mail = req.body.mail;
    const message = req.body.message;

    // Log des données reçues
    console.log("Données du formulaire de contact:", { nom, prenom, mail, message });

    // Ici, vous pouvez ajouter la logique pour traiter le message de contact
    // Par exemple, l'enregistrer dans une base de données ou l'envoyer par email
    // ...

    // Rendu du template EJS 'contact.ejs' avec un message de succès
    res.render('contact', { message: 'Votre message a été envoyé avec succès !' });

    

});




// ====================================
// ROUTE GET - PAGE entreprise
// ====================================
// Route pour afficher la page de l'entreprise
app.get('/api/entreprise', (req, res) => {
    // Log dans la console pour vérifier le passage dans cette route
    console.log("Je passe dans /api/entreprise");

    // Récupérer les entreprises depuis la base de données
    req.getConnection((err, connection) => {
        if (err) {
            console.error('Erreur de connexion à la base de données:', err);
            return res.render('entreprise', {
                entreprises: [],
                message: 'Erreur de connexion à la base de données.',
                error: true
            });
        }

        const query = 'SELECT * FROM entreprise ORDER BY id DESC';
        connection.query(query, (err, results) => {
            if (err) {
                console.error('Erreur lors de la récupération des entreprises:', err);
                return res.render('entreprise', {
                    entreprises: [],
                    message: 'Erreur lors de la récupération des données.',
                    error: true
                });
            }

            // Vérifier les paramètres d'URL pour les messages
            let message = undefined;
            let error = undefined;

            if (req.query.success) {
                message = req.query.success;
                error = false;
            } else if (req.query.error) {
                message = req.query.error;
                error = true;
            }

            // Rendu du template EJS 'entreprise.ejs' avec les données des entreprises
            res.render('entreprise', {
                entreprises: results || [],
                message: message,
                error: error
    });
    });
});
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
// ROUTE POST - TRAITEMENT FORMULAIRE CONTACT ENTREPRISE
// ====================================
// Route pour traiter le formulaire de contact d'une entreprise
app.post('/api/contact', (req, res) => {
    console.log("Traitement du formulaire de contact entreprise");

    const { nomContact, emailContact, telephoneContact, sujetContact, messageContact, destinataireEmail, entrepriseNom } = req.body;

    // Validation basique
    if (!nomContact || !emailContact || !sujetContact || !messageContact || !destinataireEmail) {
        return res.redirect('/api/entreprise?error=Veuillez remplir tous les champs obligatoires');
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailContact)) {
        return res.redirect('/api/entreprise?error=Adresse email invalide');
    }

    // Ici, on pourrait envoyer un email réel avec un service comme Nodemailer
    // Pour l'instant, on simule l'envoi et on redirige avec un message de succès
    console.log('=== NOUVEL EMAIL DE CONTACT ===');
    console.log(`De: ${nomContact} <${emailContact}>`);
    console.log(`Téléphone: ${telephoneContact || 'Non fourni'}`);
    console.log(`À: ${destinataireEmail} (${entrepriseNom})`);
    console.log(`Sujet: ${sujetContact}`);
    console.log(`Message: ${messageContact}`);
    console.log('================================');

    // Redirection avec message de succès
    res.redirect('/api/entreprise?success=Votre message a été envoyé avec succès à ' + encodeURIComponent(entrepriseNom));
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
    const SQL = "INSERT INTO equipe(nom, prenom, mail, numero, poste, adresse) VALUES (?, ?, ?, ?, ?, ?)";

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
                    res.status(302).redirect("/api/accueil");
                }
            });
        }       
    });
});




// ====================================
// ROUTE DELETE - SUPPRESSION MEMBRE ÉQUIPE
// ====================================
// Route pour supprimer un membre de l'équipe en fonction de son ID
// Exemple : localhost:3007/api/equipe/1
app.delete('/api/equipe/:id', (req, res) => {
    // Récupération de l'ID du membre à supprimer depuis les paramètres de l'URL
    const idMembreEquipe = req.params.id;
    
    // Requête SQL pour supprimer le membre (le ? sert de placeholder pour la valeur dynamique)
    const queryDelete = "DELETE FROM equipe WHERE id = ?";

    // Récupération de la connexion à la base de données
    req.getConnection((erreur, connection) => {
        // Gestion de l'erreur de connexion
        if(erreur) {
            console.log("Erreur de connexion à la base de données : ", erreur);
        } else {
            // Exécution de la requête DELETE avec l'ID du membre
            connection.query(queryDelete , [idMembreEquipe], (err,resultat) => {
                // Gestion de l'erreur de requête
                if (err) {
                    console.log("Erreur requete Suppression : ", err);
                } else {
                    // Succès de la suppression - log et retour d'une réponse JSON
                    console.log("BRAVO! Membre de l'équipe supprimé avec succès : ", resultat);
                    res.status(200).json({ routeEquipe: "/api/equipe"})
                }
            });
        }
     });
});




// Exportation de l'application pour l'utiliser dans serveur.js
module.exports = app;