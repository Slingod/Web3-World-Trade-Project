# Utiliser Node 20
FROM node:20

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json + package-lock.json d'abord pour utiliser le cache Docker
COPY ./server/package*.json ./

# Ajouter un dossier temporaire pour éviter le problème de cache
RUN npm ci --legacy-peer-deps

# Installer le client PostgreSQL
RUN apt-get update && apt-get install -y postgresql-client

# Copier le script d'attente
COPY wait-for-it.sh /usr/wait-for-it.sh
RUN chmod +x /usr/wait-for-it.sh

# Copier le reste des fichiers de l'application
COPY ./server .

# Exposer le port de l'application
EXPOSE 5000

# Lancer l'application après que la DB soit prête
CMD ["/bin/sh", "-c", "/usr/wait-for-it.sh db:5432 && npm start"]
