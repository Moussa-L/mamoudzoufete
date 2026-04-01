const modale = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];
const form = document.getElementById("membreForm");

// Ouvrir la modale pour ajouter
btn.onclick = function() {
  document.querySelector(".modal-header").textContent = "Ajouter un membre";
  form.reset();
  form.action = "/api/equipe";
  form.method = "post";
  form.onsubmit = null;
  modale.style.display = "block";
};

// Fermer la modale au clic sur X
span.onclick = function() {
  modale.style.display = "none";
};

// Fermer la modale en cliquant en dehors
window.onclick = function(event) {
  if (event.target === modale) {
    modale.style.display = "none";
  }
};

function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  if (!toast) return;
  
  toast.textContent = message;
  toast.classList.remove("show", "success", "error");
  toast.classList.add("show", type);
  
  setTimeout(() => {
    toast.classList.remove("show", type);
  }, 3000);
}

function modifierMembre(id, nom, prenom, mail, telephone, poste, adresse_postale, presentation, date_recrutement) {
  document.querySelector(".modal-header").textContent = "Modifier un membre";

  // Remplir le formulaire avec les données actuelles
  document.getElementById("nomMembreEquipe").value = nom || "";
  document.getElementById("prenomMembreEquipe").value = prenom || "";
  document.getElementById("mailMembreEquipe").value = mail || "";
  document.getElementById("telephoneMembreEquipe").value = telephone || "";
  document.getElementById("posteMembreEquipe").value = poste || "";
  document.getElementById("adresseMembreEquipe").value = adresse_postale || "";
  document.getElementById("presentationMembreEquipe").value = presentation || "";
  document.getElementById("dateRecrutement").value = date_recrutement || "";

  modale.style.display = "block";

  // Configurer le formulaire pour la modification
  form.action = `/api/equipe/${id}`;
  form.method = "post"; // Changé en post car beaucoup de serveurs n'acceptent pas PUT en form HTML

  // Supprimer les anciens événements onsubmit
  const formClone = form.cloneNode(true);
  form.parentNode.replaceChild(formClone, form);
  
  formClone.onsubmit = (e) => {
    e.preventDefault();

    const data = {
      nom: document.getElementById("nomMembreEquipe").value,
      prenom: document.getElementById("prenomMembreEquipe").value,
      mail: document.getElementById("mailMembreEquipe").value,
      telephone: document.getElementById("telephoneMembreEquipe").value,
      poste: document.getElementById("posteMembreEquipe").value,
      adresse
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