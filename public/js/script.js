    function supprimerMembre(id) {
        const routeComplete = '/api/equipe/' + id;
        
        fetch(

            routeComplete,{method: "DELETE"}

        ).then(

            (reponse) => reponse.json()

        ).then(

            (donnee) => window.location.href = donnee.routeEquipe

        ).catch(

            (erreur) => console.log(erreur)
        )
        

    }