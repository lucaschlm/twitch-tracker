SAE S02.01 – Développement d’applications

7
![](Aspose.Words.672fb9a6-164e-46fb-a3b2-f769e2ffe4a6.001.jpeg)![](Aspose.Words.672fb9a6-164e-46fb-a3b2-f769e2ffe4a6.002.png)![](Aspose.Words.672fb9a6-164e-46fb-a3b2-f769e2ffe4a6.003.png)HERR Maximilien – MURE Florian – CHALMANDRIER Lucas

# SAE S02.01 – Développement d’applications
## Comment matérialiser le dérèglement climatique, à travers des graphiques ’’parlants’’ ?

[SAE S02.01 – Développement d’applications	1](#_Toc102643940)

[Comment matérialiser le dérèglement climatique, à travers des graphiques ’’parlants’’ ?	1](#_Toc102643941)

[Installation de Libgraph2	1](#_Toc102643942)

[Ajout des fichiers	1](#_Toc102643943)

[Paramétrage du projet Visual	1](#_Toc102643944)

[Un peu de graphiques désormais !	2](#_Toc102643945)

[Graphique spirales (ou dodécagonale, mais on ne va pas chipoter)	2](#_Toc102643946)

[Le graphique clair-foncé	4](#_Toc102643947)

[Les raies de couleur	5](#_Toc102643948)

[Interaction entre les graphiques	6](#_Toc102643949)

[Limites & problèmes rencontrés	6](#_Toc102643950)


### Installation de Libgraph2
#### Ajout des fichiers
Nous devons rajouter différents fichiers pour que LibGraph2 fonctionne correctement :

- Le fichier « LibGraph2.h » dans un dossier « inc » au niveau du projet.
- Le fichier « LibGraph2.lib » au niveau du projet dans les dossiers suivants :
  - lib\x64\Debug
  - lib\x64\Release
- Le fichier « LibGraph2.dll » au niveau de l’exécutable de l’application.

#### Paramétrage du projet Visual
Une fois les fichiers rajoutés, il y a certaines propriétés de configuration de notre projet à changer :

- Dans « Editeur de liens » --> « entrée », il faut ajouter « LibGraph2.lib » dans les « Dépendances supplémentaires ».
- Dans « Editeur de liens » --> « Système », il faut changer le « Sous-Système » en « Windows (/SUBSYSTEM:WINDOWS) », LibGraph ne fonctionnant pas en mode console.
- Il faut ensuite indiquer à Visual où trouver les différents fichiers LibGraph :
  - Dans « Répertoire VC++ », il faut ajouter au « Répertoires Include » la valeur « inc », étant l’emplacement où se trouve notre fichier include.
  - Toujours dans « Répertoire VC++ », il faut ajouter dans « Répertoires de bibliothèques » la valeur « lib\$(Platform)\$(Configuration) », pour indiquer les emplacements où se trouvent les fichiers lib.

Notre projet peut maintenant fonctionner avec LibGraph2 ! 

### Un peu de graphiques désormais !
#### Graphique spirales (ou dodécagonale, mais on ne va pas chipoter)
##### Théorie (Des maths !)
Pour répartir correctement les 12 mois de l’année sur un repère orthonormé, on va faire un peu de mathématiques pour appréhender ce graphique. On va considérer 6 axes, qui vont nous donner les 12 segments des 12 mois de l’année.

Concrètement, cela ressemble à ça : 

![](Aspose.Words.672fb9a6-164e-46fb-a3b2-f769e2ffe4a6.004.png)

Les 2 axes orthogonaux sont les axes d’origine du repère, et nous avons 4 fonctions, qui nous donnent les 8 autres segments nécessaires. Ainsi, ces fonctions reprennent des éléments du cercle trigonométrique.

Ces fonctions dépendent de T, la différence entre la valeur de moyenne courante, et la valeur d’index, étant les premières données (celles des mois de 1990). Ainsi, on calcule avec les formules ci-dessous, les coordonnées des points de chaque année :

![](Aspose.Words.672fb9a6-164e-46fb-a3b2-f769e2ffe4a6.005.jpeg)

Toutefois, ce repère ne s’applique pas tel quel à notre modèle de Libgraph2. En effet, notre point d’ancrage (0, 0) est au centre, quand il est dans le coin supérieur gauche sur LibGraph2. Donc en se basant sur une fenêtre carrée de 1500 par 1000 sur LibGraph2, on fera un correctif en ajoutant la moitié de la taille de la fenêtre, sur les coordonnées X et Y des points, pour les recentrer. Également, pour avoir une visibilité accrue, on va ajouter 5 de valeur à T, pour éviter des valeurs négatives, qui créeraient un graphique difforme. Maintenant que nous avons fini avec la partie théorique, un peu de C++ !
##### Graphique Spirale sur LibGraph2
Déconstruisons un peu le programme réalisé. Concrètement, on commence par boucler du premier janvier de la 2e année, jusqu’à la fin des données. 

for (size\_t i = 13; i < sommeMoyStation.size() + 1; i++) { // On parcours tous les mois

À la suite de cela, on calcule d’abord la valeur de T, comme vu précédemment. Mais pour améliorer le rendu visuel, nous allons multiplier par 48 les valeurs, en plus de cet ajout de 5 qui évite les valeurs négatives. Cela dispersera un peu plus des écarts parfois minimes entre deux valeurs.

float T = ((sommeMoyStation[i - 1] - sommeMoyStation[i - 1 - (12 \* cptAnnee)]) + 5) \* 48;

Une fois cela fait, on fait un switch sur les différents mois de l’année, pour savoir si nous sommes en janvier, février …

switch (i - (12 \* cptAnnee)) // Switch pour savoir le mois en cours (janvier, février, ...)

`        `{

`        `case 1: // Janvier

`            `vCpointGraph.push\_back(CPoint{ coef, T + coef });

`            `break;

`         `…

Cela nous permet de créer un point avec la formule des coordonnées correspondante au bon mois, et on push dans un vecteur contenant toutes les informations.

Ensuite, on parcourt tout le vecteur, et on dessine un trait entre deux points consécutifs, pour donner ce rendu « spirales ». Et de plus, en fonction de la valeur de i, on change la couleur du trait d’année en années. Et on incrémente un compteur du nombre d’années, qui nous permet de se placer dans le bon case du switch.

![](Aspose.Words.672fb9a6-164e-46fb-a3b2-f769e2ffe4a6.006.png)
##### Soit, mais à quoi ça sert ?
Ce graphique montre clairement que, quel que soit le mois de l’année, les températures moyennes mensuelles augmentent. C’est donc clairement un réchauffement global qui se fait. Toutefois, cela ne permet pas de montrer des périodes de froid accrues en hiver, qui se révèle un peu plus dans le schéma clair-foncé.




#### Le graphique clair-foncé
Ce graphique se compose en rectangles de couleur, révélant des intervalles de température. C’est un moyen visuel coloré de voir rapidement quand est-ce qu’il fait chaud, et quand est-ce qu’il fait froid. Ici, nous ne cherchons pas à faire le prochain bulletin météo, on va donc chercher l’existence ou non de valeurs extrêmes.
##### Le code
Contrairement au précédent graphique, il n’y a pas nécessairement d’aspect mathématique, on passe donc directement au code.

Pour répartir les couleurs, selon l’amplitude totale des températures, on calcule différentes valeurs, dont le min et le max.

Pour adapter correctement les dimensions, on récupère les dimensions de la fenêtre, et on calcule une taille pour la marge, la largeur et la hauteur de chaque rectangle.

Une fois cette partie calculatoire faite, on va afficher tout ça, en parcourant les datas :

for (size\_t i = 0; i < data.size(); i++)

Et dès que l’on passe sur un multiple de 12, cela correspond à un passage d’année, on saute donc une ligne.

On choisit la couleur selon la température courante, et en comparant avec les intervalles de températures calculés avant.

for (size\_t j = 0; j < colorNb; j++)

{

`    `if (data[i] <= intervals[j])

`    `{

`        `color = colors[j];

`        `break;

`    `}

}

Et ensuite on affiche rectangle par rectangle !

![Une image contenant bâtiment, store, tour

Description générée automatiquement](Aspose.Words.672fb9a6-164e-46fb-a3b2-f769e2ffe4a6.007.png)
##### Conclusion sur ce graphique
Ce graphique nous montre un autre aspect du dérèglement climatique. Les valeurs extrêmes, en particulier l’été, sont de plus en plus extrêmes. On a par exemple 3 à 5 mois complet de valeur très forte parmi l’intervalle des moyennes de température entre 1992 et 2021.

#### Les raies de couleur
Jusque-là, pour rappel, nous avons montré un réchauffement global des moyennes de température mensuelles. On a également montré l’apparition de valeurs extrêmes de température. On peut maintenant, même si on le suppose, qu’il y a une augmentation de la température moyenne annuelle qui augmente. On va le faire avec un graphique de 30 raies de couleur, pour les 30 années de données.
##### La partie programmation
Là non plus, pas de mathématiques particulièrement, on passe donc au code de la fonction. Tout d’abord, nous avons jusque-là un vecteur avec les moyennes de température des 360 mois de données. Ici, nous souhaitons avec seulement 30 données, pour les moyennes annuelles.

On va donc parcourir toutes les données, et créer un tableau contenant les températures moyennes annuelles.

for (size\_t i = 0; i < data.size(); i++)

{

`    `if (i % 12 == 0 && i != 0)

`    `{

`        `moy /= 12.f;

`        `tempPerYear[cpt] = moy;

`        `cpt++;

`    `}

`    `moy += data[i];

}

Et ensuite, cela se rapproche de ce que nous avons fait précédemment, avec des intervalles de température, et une définition de la taille des rectangles …

On trouve donc le résultat suivant :

![](Aspose.Words.672fb9a6-164e-46fb-a3b2-f769e2ffe4a6.008.png)

Et clairement, on voit ici une évolution de la température générale. Sur les 10 dernières années, on connaît les températures moyennes annuelles les plus chaudes.

### Interaction entre les graphiques
Pour éviter de devoir lancer manuellement chaque graphique, ou de devoir fermer une fenêtre pour afficher le graphique suivant, nous sommes partis sur des touches de contrôle, à savoir ‘S’, pour le graphique spirale, ‘C’, pour le Clair-Fonce et ‘R’, pour les Raies de couleur.

Ce système se fait à travers une hiérarchie de classes, détaillée ci-dessous :

![](Aspose.Words.672fb9a6-164e-46fb-a3b2-f769e2ffe4a6.009.png)

### Limites & problèmes rencontrés
Dans cette SAE, nous sommes sur un jeu de données plutôt limitée. Si nous avions un jeu de données plus important, en temps, et en espace, nous pourrions obtenir de biens meilleurs résultats, et bien plus parlant.

Toutefois, même en se concentrant sur des données de la France métropolitaine, sur les 30 dernières années, on remarque déjà des éléments du réchauffement climatique.

Également, vous l’avez surement remarqué, mais il n’y a pas de texte affiché sur nos graphiques. En effet, en utilisant la méthode drawString, nous avions des caractères aléatoires, bien que nous ayons enregistré en UTF-8. Nous n’avons pas réussi à déterminé la cause de ce problème.

Par ailleurs, pour le menu, même en essayant de mettre une image, cela ne marchait pas. (PS : image de menu ci-dessous)

![](Aspose.Words.672fb9a6-164e-46fb-a3b2-f769e2ffe4a6.010.png)
|7|
| :-: |

