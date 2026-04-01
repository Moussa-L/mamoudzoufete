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
INSERT INTO entreprise (nom, prenom, mail, numero, metier, adresse, presentation, societe) VALUES ('Moussa Harouna', 'Taambati,', 'taambati@gmail.com', '0606060606', 'Militante', 'Bouéni', 'une militante et représentante de la beauté mahoraise.', 'Ouzouri wa Mtroumché');

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
    societe VARCHAR(255)
    
);

--Ajouter un contact
INSERT INTO contact (nom, responsable, telephone, mail, adresse_postale, societe) VALUES ('Mamoudzou Ville', ' Moussa Lidya', '0606060606', 'mamoudzouville@gmail.com', '9700, Mamoudzou', 'Mamoudzou en fête');

-- Afficher les contacts
SELECT * FROM contact;




--- Requête de création de la table "equipe"
CREATE TABLE equipe (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nom VARCHAR(155) NOT NULL,
    prenom VARCHAR(155) NOT NULL,
    mail VARCHAR(100) NOT NULL,-- ce champ est facultatif
    numero VARCHAR(100) NOT NULL,
    adresse VARCHAR(255),
    poste VARCHAR(255) NOT NULL
);

--Ajouter une équipe
INSERT INTO equipe (nom, prenom, mail, numero, adresse, poste) VALUES ('Moussa', 'Lidya', 'moussa.lidya@gmail.com', '0606060606', '9700, Mamoudzou', 'Développeur');

-- Afficher les équipes
SELECT * FROM equipe;
