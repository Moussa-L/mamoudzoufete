// Ici ,je code mon serveur.js

// Importation du module HTTP est de stockée dans une constante (variable)nommée http
const http = require('http');
const app = require('./app');
// Maintenant, je crée un serveur web en utilisant la méthode createServer du module HTTP
const numPort = 3007;

app.set('port', numPort);

/*app.use((req, res) => {
res.end('Bonjour je suis le serveur Node.js!');
}); 

    


// ici j'ai affaire a une fonction fléchée (function) qui prend deux paramètres req (requête) et res (réponse)
const server = http.createServer((req, res) => {*/



const server = http.createServer(app);

/*const date = new Date();

// Le serveur écoute sur le port  Port signifie l'adresse locale de mon ordinateur*/

    server.listen(numPort, () => {
    console.log("Le serveur est démarré sur le port ", numPort);
    /*console.log( date.toLocaleString());*/
});