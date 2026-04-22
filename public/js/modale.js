// Fichier modale.js - Gestion des interactions avec la modale d'ajout/modification de membres d'équipe

// Sélection des éléments DOM nécessaires pour la gestion de la modale
const modale = document.getElementById("myModal"); // Élément de la modale
const btn = document.getElementById("myBtn"); // Bouton pour ouvrir la modale
const span = document.getElementsByClassName("close")[0]; // Bouton de fermeture (X)
const form = document.getElementById("membreForm"); // Formulaire dans la modale

// Vérification que les éléments existent avant d'ajouter les événements
if (btn && modale) {
  // Gestionnaire d'événement pour ouvrir la modale en mode ajout
  btn.onclick = function() {
    // Modification du titre de la modale pour indiquer le mode ajout
    const header = document.querySelector(".modal-header");
    if (header) {
      header.textContent = "Ajouter un membre";
    }
    // Réinitialisation du formulaire et configuration pour l'ajout
    if (form) {
      form.reset(); // Vide tous les champs du formulaire
      form.action = "/api/equipe"; // Définit l'URL d'action
      form.method = "post"; // Méthode POST pour l'ajout
      form.onsubmit = null; // Supprime tout gestionnaire onsubmit existant
    }
    // Affichage de la modale
    modale.style.display = "block";
  };
}

// Vérification pour la fermeture via le bouton X
if (span && modale) {
  // Gestionnaire pour fermer la modale en cliquant sur X
  span.onclick = function() {
    modale.style.display = "none";
  };
}

// Vérification pour la fermeture en cliquant en dehors de la modale
if (modale) {
  // Gestionnaire d'événement sur la fenêtre pour détecter les clics extérieurs
  window.onclick = function(event) {
    // Si le clic est sur la modale elle-même (pas sur son contenu)
    if (event.target === modale) {
      modale.style.display = "none";
    }
  };
}

// Fonction pour afficher des notifications toast
function showToast(message, type = "success") {
  // Sélection de l'élément toast
  const toast = document.getElementById("toast");
  if (!toast) return; // Sortie si l'élément n'existe pas
  
  // Configuration du message et des classes CSS
  toast.textContent = message;
  toast.classList.remove("show", "success", "error"); // Suppression des classes existantes
  toast.classList.add("show", type); // Ajout des classes pour afficher et typer le toast
  
  // Masquage automatique après 3 secondes
  setTimeout(() => {
    toast.classList.remove("show", type);
  }, 3000);
}

function modifierMembre(id, nom, prenom, mail, telephone, poste, adresse) {
  const header = document.querySelector(".modal-header");
  if (header) {
    header.textContent = "Modifier un membre";
  }

  // Remplir le formulaire avec les données actuelles
  const nomField = document.getElementById("nomMembreEquipe");
  const prenomField = document.getElementById("prenomMembreEquipe");
  const mailField = document.getElementById("mailMembreEquipe");
  const telephoneField = document.getElementById("telephoneMembreEquipe");
  const posteField = document.getElementById("posteMembreEquipe");
  const adresseField = document.getElementById("adresseMembreEquipe");

  if (nomField) nomField.value = nom || "";
  if (prenomField) prenomField.value = prenom || "";
  if (mailField) mailField.value = mail || "";
  if (telephoneField) telephoneField.value = telephone || "";
  if (posteField) posteField.value = poste || "";
  if (adresseField) adresseField.value = adresse || "";
  
  if (modale) {
    modale.style.display = "block";
  }

  if (!form) return;

  // Configurer le formulaire pour la modification
  form.action = `/api/equipe/${id}`;
  form.method = "post"; // Changé en post car beaucoup de serveurs n'acceptent pas PUT en form HTML

  // Supprimer les anciens événements onsubmit
  const formClone = form.cloneNode(true);
  form.parentNode.replaceChild(formClone, form);
  
  formClone.onsubmit = (e) => {
    e.preventDefault();

    const data = {
      nom: nomField ? nomField.value : "",
      prenom: prenomField ? prenomField.value : "",
      mail: mailField ? mailField.value : "",
      telephone: telephoneField ? telephoneField.value : "",
      poste: posteField ? posteField.value : "",
      adresse: adresseField ? adresseField.value : "",
    };

    fetch(`/api/equipe/${id}`, { 
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.ok) {
        modale.style.display = "none";
        showToast("Modification réussie !");
        setTimeout(() => location.reload(), 1200);
      } else {
        showToast("Erreur serveur", "error");
      }
    })
    .catch(err => {
      console.error(err);
      showToast("Erreur réseau", "error");
    });
  };
}

function supprimerMembre(id) {
  if (confirm("Êtes-vous sûr de vouloir supprimer ce membre ?")) {
    fetch(`/api/equipe/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })
    .then(res => {
      if (res.ok) {
        showToast("Membre supprimé !");
        setTimeout(() => location.reload(), 1200);
      } else {
        showToast("Erreur serveur", "error");
      }
    })
    .catch(err => {
      console.error(err);
      showToast("Erreur réseau", "error");
    });
  }
}