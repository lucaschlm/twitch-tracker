# Twitch Tracker

## Présentation du projet

Twitch Tracker est un projet WEB permettant d'afficher les statistiques de différents streamers de la plateforme [Twitch](https://www.twitch.tv/). Ce projet a été réalisé dans le cadre de notre formation d'informatique (BUT) du Puy-en-Velay. 
L'objectif était de récupérer des données d'une base de donnée MySQL, puis de les traiter dans un site WEB.
Pour ce faire, nous avons utilisé différentes technologies :
- **HTML5** & **CSS3** pour le front-end du site
- **PHP** pour récupérer les données de la base de données et les transformer en données exploitables (format **JSON**)
- **JavaScript** pour traiter les données et afficher des graphiques en conséquence (en utilisant **NodeJS**)
   - **Axios** pour les requettes HTTP
   - **Chart.js** pour les graphiques
- **[json-server](https://github.com/typicode/json-server)** pour créer une fausse API avec un fichier json (utile lors de la conception, lorsque les données n'étaient pas encore exploitables par le js)

## Lancer le projet

- Dans le dossier **HTML-CSS-PHP**, lancer un `npm start`
- Possibilité de lancer la fausse API situé dans le dossier racine pour avoir des données accessibles en local (voir le [github](https://github.com/typicode/json-server) pour savoir comment lancer la fausse API)

## Participants du projet
- CHALMANDRIER Lucas
- MURE Florian
- HERR Maximilien

## Fonctionnalités réalisées

- Réalisation des maquettes sur Affinity Designer pour la partie template de nos pages HTML/CSS
- HTML des trois pages (home page, stats streamer et stats mensuelles)
- API en PHP, qui requête sur la BDD en MySQL, accessible via une URL du type : 

   • [https://twitchtracking.maximilienherr.web-edu.fr/index.php/streamerName/[NomStreamer]](https://twitchtracking.maximilienherr.web-edu.fr/index.php/streamerName/mynthos)
   
   • [https://twitchtracking.maximilienherr.web-edu.fr/index.php/steamerDate/[MMAAAA]](https://twitchtracking.maximilienherr.web-edu.fr/index.php/streamerDate/052022)
   
- Sur statsstreamer et statsmensuelles, un script JS récupère les données envoyés en JSON par l'API pour ensuite faire et afficher les graphiques.
- Sur les stats mensuelles, on peut afficher et désafficher les données d'un streamer en particulier.
- Et les stats streamer nous permettent donc de voir les données sur plusieurs mois d'un stramer en particulier

## Bonus tentés

- Réalisation du CSS (C’est pas la folie, mais c’est mieux que de l’écrit noir sur fond blanc)

## URL Github

Lien du repos [GitHub](https://github.com/lucaschlm/twitch-tracker)

## URL vers une archive


## URL du site hébergé en ligne

Vous trouverez le site en ligne ici : [Site](https://twitchtracking.maximilienherr.web-edu.fr/)
