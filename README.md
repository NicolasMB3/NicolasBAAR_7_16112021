[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<div id="top"></div>

<div align="center">

  ### 🌍 Groupomania

  <p align="center">
    Projet pour OpenClassrooms
    <br />
    <a href="https://nicolasbaar.fr/"><strong>Mon site web »</strong></a>
    <br />
    <br />
    <a href="https://github.com/NicolasMB3/NicolasBAAR_7_16112021/issues">Un bug 🐜</a>
    ·
    <a href="https://github.com/NicolasMB3/NicolasBAAR_7_16112021/issues">Une option à ajouter 🗂️</a>
  </p>
</div>

## À propos :

Le site Groupomania est un projet produit par Nicolas pour la formation de développeur web à OpenClassrooms.

Contenance du site :
* Création de pages dynamiques pour afficher les commentaires,
* Utilisation de Javascript, Node.js, JWT, Express, Joi, Sequelize et VueJS 3,
* Création de messages/commentaires, suppression et modification.

## Développer avec :

Liste de tous les languages utilisés pour la création du site :

* [HTML](https://developer.mozilla.org/fr/docs/Web/HTML)
* [CSS](https://developer.mozilla.org/fr/docs/Web/CSS)
* [VueJS](https://v3.vuejs.org/guide/introduction.html)
* [Node.js](https://nodejs.org/en/)

## Installation

Pour pouvoir faire fonctionner le site correctement et accéder à toutes les fonctionnalités que propose Groupomania, vous aurez besoin d'installer certains packages :

### Prérequis

Dans une console Node.js (ou directement avec la console de Visual Studio Code)
1. Accéder au dossier back-end :
   ```sh
   npm install
   ```
2. Accéder au dossier front-end :
   ```sh
   npm install
   ```

### Installation

Une fois Node.js correctement installé (dans le dossier front, mais aussi dans le dossier back). Vous aurez besoin de lancer les serveurs grâce aux commandes suivantes :

1. Créer une base de donnée avec le nom groupomania
   ```sh
   CREATE DATABASE groupomania;
   ```
2. Créer un fichier .env dans le dossier back
   ```js
   JWT_TOKEN=SECRET-KEY
   ```
3. Créer un fichier db.config.json dans le dossier back
   ```json
   {
      "development": {
         "host": "host_name",
         "database": "database_name",
         "username": "username",
         "password": "password",
         "dialect": "mysql"
      }
   }
   ```
4. Lancer le serveur back-end
   ```sh
   nodemon server
   ```
5. Lancer le serveur front-end
   ```sh
   npm run serve
   ```
Une fois le serveur back-end et front-end allumés, une page devrait s'ouvrir automatiquement sur votre navigateur préféré 🎉

## Contacts

Nicolas BAAR - [@MeesN](https://nicolasbaar.fr/) - nicolasbaar@icloud.com

Lien du projet : [https://github.com/NicolasMB3/NicolasBAAR_7_16112021](https://github.com/NicolasMB3/NicolasBAAR_7_16112021)

<p align="right">(<a href="#top">Revenir en haut de la page</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/NicolasMB3/NicolasBAAR_7_16112021.svg?style=for-the-badge
[contributors-url]: https://github.com/NicolasMB3/NicolasBAAR_7_16112021/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/NicolasMB3/NicolasBAAR_7_16112021.svg?style=for-the-badge
[forks-url]: https://github.com/NicolasMB3/NicolasBAAR_7_16112021/pulse
[stars-shield]: https://img.shields.io/github/stars/NicolasMB3/NicolasBAAR_7_16112021.svg?style=for-the-badge
[stars-url]: https://github.com/NicolasMB3/NicolasBAAR_7_16112021/stargazers
[issues-shield]: https://img.shields.io/github/issues/NicolasMB3/NicolasBAAR_7_16112021.svg?style=for-the-badge
[issues-url]: https://github.com/NicolasMB3/NicolasBAAR_7_16112021/issues
