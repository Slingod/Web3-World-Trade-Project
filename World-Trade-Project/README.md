# 🌟 World Trade Project

**Optimisez vos gains dans vos jeux favoris grâce à des outils de suivi des prix, de gestion des matériaux et de calcul automatisé des coûts de fabrication.**

## 🎮 Présentation

World-Trade-Project est une plateforme permettant aux joueurs de World Shard, Bigtime, et autres jeux de maximiser leurs bénéfices. Grâce à un suivi des prix en temps réel, à la gestion des matériaux et à des outils de calcul de coûts de fabrication, vous pouvez repérer rapidement les opportunités les plus rentables.

## 🛠️ Technologies et outils

### Frontend

- **Framework** : React.js
- **Styling** : Tailwind CSS
- **Gestion d'état** : Redux Toolkit
- **Routing** : React Router

### Backend

- **Framework** : Express.js
- **Base de données** : PostgreSQL
- **ORM** : Sequelize
- **Authentification** : JWT

### Outils supplémentaires

- **Containerisation** : Docker
- **Gestion des API** : Postman ou Insomnia

## 📅 Plan de développement

### Phase 1 : Configuration initiale

- ~~Initialisation frontend/backend~~
- ~~Configuration PostgreSQL et variables d'environnement~~
- ~~Mise en place authentification JWT~~

### Phase 2 : Fonctionnalités de base

- ~~Page d'accueil React~~
- ~~API endpoints objets/prix~~
- ~~Interface liste d'objets~~

### Phase 3 : Gestion des prix et matériaux

- CRUD objets et prix
- Relations objets/matériaux
- Interface stocks et coûts

### Phase 4 : Calculateur de coûts

- Calcul automatique des prix
- Mise à jour temps réel
- Calcul des marges

### Phase 5 : Fonctionnalités avancées

- Filtres et tri avancés
- Graphiques et tendances
- Tests unitaires/intégration

## 👥 Collaboration

- **GitHub Projects** : Organisation des tâches
- **Issues** : Suivi des bugs
- **Pull Requests** : Validation du code
- **Wiki** : Documentation
- **CHANGELOG.md** : Suivi des versions

## 🔮 Évolutions futures

1. **Notifications** temps réel
2. **Extension** à d'autres jeux
3. **Reconnaissance d'image** pour les objets
4. **Mode offline**

## 📄 Licence

Ce projet est sous licence MIT.

---

_Pour contribuer, clonez le projet et suivez notre guide de contribution dans le Wiki._

## API Endpoints

### Objets/Prix

...

## Fonctionnalités principales

### Page d'accueil

- Présentation succincte du site
-

### Interface utilisateur

- Design responsive pour une utilisation optimale sur ordinateur et mobile
- Navigation intuitive entre les différentes sections du site

### Base de données des objets

- Liste complète des objets
- Informations détaillées pour chaque objet :
  - Nom
  - Image
  - Rareté
  - Catégorie
  - Prix actuel
  - Coût de fabrication
  - Marge de profit
  - Matériaux nécessaires pour la fabrication.

### Système de mise à jour des prix

- Formulaire permettant aux utilisateurs Premium de mettre à jour le prix actuel des objets manuelement ou par chat IA
- Système de validation pour éviter les erreurs ou les abus
- Historique des prix pour suivre l'évolution du marché

### Calculateur de coûts de fabrication

- Outil automatique pour calculer le coût de fabrication des objets
- Prise en compte des prix actuels des matériaux nécessaires
- Mise à jour en temps réel en fonction des changements de prix

### Gestion des matériaux

- Table distincte pour les matériaux nécessaires à la fabrication
- Liaison entre les objets et leurs matériaux requis
- Quantités nécessaires pour chaque matériau dans la fabrication d'un objet

### Filtres et tri

- Options de filtrage par catégorie, rareté, rentabilité, etc.
- Possibilité de trier les objets selon différents critères

### Système d'authentification

- Création de compte utilisateur
- Connexion sécurisée
- Profils utilisateurs avec historique des contributions

### Spécifications techniques

- Base de données robuste pour stocker les informations des objets et les données utilisateurs
- Système de cache pour optimiser les performances
- Mesures de sécurité pour protéger les données des utilisateurs et prévenir les attaques

### Évolutions futures

- Ajout de graphiques pour visualiser l'évolution des prix
- Système de notifications pour les changements de prix importants
- Possibilité d'ajouter d'autres jeux à la plateforme par la suite

## Roadmap

1. **Mise en place de l'authentification JWT**

   - Inscription des utilisateurs
   - Connexion des utilisateurs
   - Protection des routes

2. **Développement des fonctionnalités principales**

   - Gestion des objets
   - Gestion des prix
   - Calculateur de coûts de fabrication
   - Gestion des matériaux
   - Filtres et tri

3. **Améliorations et optimisations**

   - Sécurité
   - Performance
   - Expérience utilisateur

4. **Évolutions futures**
   - Ajout de graphiques pour visualiser l'évolution des prix
   - Système de notifications pour les changements de prix importants
   - Possibilité d'ajouter d'autres jeux à la plateforme par la suite
