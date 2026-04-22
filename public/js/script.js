    // Fonction pour supprimer un membre de l'équipe
    function supprimerMembre(id) {
        // Construit l'URL complète pour la suppression
        const routeComplete = '/api/equipe/' + id;
        
        // Envoie une requête DELETE à l'API
        fetch(
            routeComplete,
            {method: "DELETE"}
        ).then(
            // Traite la réponse JSON
            (reponse) => reponse.json()
        ).then(
            // Redirige vers la route retournée par l'API
            (donnee) => window.location.href = donnee.routeEquipe
        ).catch(
            // Gère les erreurs en les affichant dans la console
            (erreur) => console.log(erreur)
        )
    }