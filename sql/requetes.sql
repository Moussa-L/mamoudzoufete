-- Requête de création de la table "entreprise"
CREATE TABLE entreprise(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nom VARCHAR(155) NOT NULL,
    prenom VARCHAR(155) NOT NULL,
    mail VARCHAR(100) NOT NULL,-- ce champ est facultatif
    numero VARCHAR(100) NOT NULL,
    metier VARCHAR(80) NOT NULL,
    adresse VARCHAR(255),
    presentation VARCHAR(255),
    societe VARCHAR(255)
);

-- voir les tables de la base de données
SHOW TABLES;

--Ajouter une entreprise
INSERT INTO entreprise (nom, prenom, mail, numero, metier, adresse, presentation, societe) VALUES ('Moussa Harouna', 'Taambati', 'taambati@gmail.com', '0606060606', 'Militante', 'Bouéni', 'une militante et représentante de la beauté mahoraise.', 'Ouzouri wa Mtroumché');

--Ajouter une entreprise
INSERT INTO entreprise (nom, prenom, mail, numero, metier, adresse, presentation, societe) VALUES ('Baco', 'Ali', 'ali.baco@gmail.com', '0606060606', 'Chanteur et auteur compositeur', 'Bandrélé', 'Son style de musique est le mgodro.', 'Tama Music');

--Ajouter une entreprise
INSERT INTO entreprise (nom, prenom, mail, numero, metier, adresse, presentation, societe) VALUES ('Fundi', 'Madi', 'contact@tourisme-centreouest.yt', '0269 61 59 72', 'Agriculteur', 'Route nationale 2 - Coconi 97670 Ouangani', 'amateur de culture, de gastronomie, d\'agriculture.', 'Le Pôle d\'Excellence Rurale PER de Mayotte');

--Ajouter une entreprise
INSERT INTO entreprise (nom, prenom, mail, numero, metier, adresse, presentation, societe) VALUES ('Amida', 'Zily', 'amida.zily@gmail.com', '0269 41 52 63', 'Chanteuse', 'Tsigoni', 'une chanteuse et auteure-compositrice-interprète mahoraise.', 'UVAGA');

--Ajouter une entreprise
INSERT INTO entreprise (nom, prenom, mail, numero, metier, adresse, presentation, societe) VALUES ('MAMAS', 'Shingo', 'shinga@gmail.com', '06045356', 'Production ancestrale', 'Bandrélé', 'le travail ancestral des mamas shingos qui produisent un très beau sel blanc.', 'L\'Ecomusée du sel de Bandrélé');

-- Afficher les entreprises
SELECT * FROM entreprise;


--- Requête de création de la table "compte"
CREATE TABLE compte(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nom VARCHAR(155) NOT NULL,
    prenom VARCHAR(155) NOT NULL,
    mail VARCHAR(100) NOT NULL,-- ce champ est facultatif
    numero VARCHAR(100) NOT NULL,
    adresse VARCHAR(255),
    mot_de_passe VARCHAR(255) NOT NULL
);


--Ajouter un compte
INSERT INTO compte (nom, prenom, mail, numero, adresse, mot_de_passe) VALUES ('Moinecha', 'Amia', 'amia@gmail.com', '07767700606', 'Chigoni', 'motdepasse123');

-- Afficher les comptes
SELECT * FROM compte;



--- Requête de création de la table "contact"
CREATE TABLE contact (  
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nom VARCHAR(155) NOT NULL,
    responsable VARCHAR(155) NOT NULL,
    telephone VARCHAR(80) NOT NULL,-- ce champ est facultatif
    mail VARCHAR(155) NOT NULL,
    adresse_postale VARCHAR(300) NOT NULL,
    societe VARCHAR(255),

    
);

--Ajouter un contact
INSERT INTO contact (nom, responsable, telephone, mail, adresse_postale, societe) VALUES ('Mamoudzou Ville', ' Moussa Lidya', '0606060606', 'mamoudzouville@gmail.com', '9700, Mamoudzou', 'Mamoudzou en fête');

-- Afficher les contacts
SELECT * FROM contact;

-- Requête pour ajouter la colonne "entreprise" à la table "contact"
ALTER TABLE contact ADD entreprise VARCHAR(255);

-- Requête pour renommer la colonne "entreprise" en "organisateur" dans la table "contact"
ALTER TABLE contact CHANGE entreprise organisateur VARCHAR(255);




--- Requête de création de la table "equipe"
CREATE TABLE equipe (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nom VARCHAR(155) NOT NULL,
    prenom VARCHAR(155) NOT NULL,
    mail VARCHAR(100) NOT NULL,-- ce champ est facultatif
    numero VARCHAR(100) NOT NULL,
    poste VARCHAR(255) NOT NULL,
    adresse VARCHAR(255)
);

--Ajouter une équipe
INSERT INTO equipe (nom, prenom, mail, numero, poste, adresse) VALUES ('Moussa', 'Lidya', 'moussa.lidya@gmail.com', '0606060606', 'Développeur', '9700, Mamoudzou');

-- Afficher les équipes
SELECT * FROM equipe;
-- Requête pour supprimer la colonne "adresse" de la table "equipe"
ALTER TABLE equipe DROP COLUMN adresse;

--- Requête pour ajouter la colonne "adresse" à la table "equipe"
ALTER TABLE equipe ADD adresse VARCHAR(255);
