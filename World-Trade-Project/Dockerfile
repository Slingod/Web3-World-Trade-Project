# Utilisez une image de base officielle de Node.js
FROM node:16

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez les fichiers package.json et package-lock.json
COPY ./server/package*.json ./

# Installez les dépendances
RUN npm install

# Installez le client PostgreSQL
RUN apt-get update && apt-get install -y postgresql-client

# Copiez le script d'attente
COPY wait-for-it.sh /usr/wait-for-it.sh
RUN chmod +x /usr/wait-for-it.sh

# Copiez le reste des fichiers de l'application
COPY ./server .

# Exposez le port sur lequel l'application écoute
EXPOSE 5000

# Commande pour démarrer l'application
CMD ["/bin/sh", "-c", "/usr/wait-for-it.sh db:5432 && npm start"]