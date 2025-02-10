# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

Voici une arborescence optimisée organiser des fichiers :

client/
├── node_modules/ ------------------------ # Directory for Node.js dependencies
├── public/ -------------------------------# Public assets directory
│ ├── betdox.png --------------------------# Image file
│ ├── Big_Time_Warrior_Discordlogo.png ----# Image file
│ ├── CHRDAO.jpg --------------------------# Image file
│ ├── doxlo.png ---------------------------# Image file
│ ├── favicon.ico -------------------------# Favicon file
│ ├── faviconParadox.png ------------------# Image file
│ ├── IconeParadox.png --------------------# Image file
│ ├── index.html --------------------------# Main HTML file
│ ├── Logo THP.png ------------------------# Image file
│ ├── logo.svg ----------------------------# SVG logo file
│ ├── logo512.png -------------------------# Image file
│ ├── manifest.json -----------------------# Web app manifest file
│ ├── OP.webp -----------------------------# WebP image file
│ ├── para.png ----------------------------# Image file
│ └── robots.txt --------------------------# Robots exclusion standard file
├── src/ ----------------------------------# Source code directory
│ ├── components/ -------------------------# Directory for React components
│ │ ├── auth/ -----------------------------# Authentication-related components
│ │ │ ├── EncryptButton.css ---------------# Styles for EncryptButton component
│ │ │ └── EncryptButton.js---------------- # EncryptButton component
│ │ │ ├── Login.css -----------------------# Styles for Login component
│ │ │ └── Login.js ------------------------# Login component
│ │ ├── common/ ---------------------------# Common components
│ │ │ ├── Footer/------------------------- # Footer-related components
│ │ │ │ ├── DiscordFooter.css -------------# Styles for DiscordFooter component
│ │ │ │ └── DiscordFooter.js --------------# DiscordFooter component
│ │ │ ├── Footer.css ----------------------# Styles for Footer component
│ │ │ └── Footer.js -----------------------# Footer component
│ │ ├── Sidebar/ --------------------------# Sidebar-related components
│ │ │ ├── index.js ------------------------# Index file for Sidebar
│ │ │ ├── Sidebar.css ---------------------# Styles for Sidebar component
│ │ │ └── Sidebar.js ----------------------# Sidebar component
│ │ └── ThemeToggle.js --------------------# ThemeToggle component
│ ├── game/ -------------------------------# Game-related components and files
│ │ ├── CurrentVersion.js -----------------# Current version information
│ │ ├── GameObjectsList.css ---------------# Styles for GameObjectsList component
│ │ └── GameObjectsList.js ----------------# GameObjectsList component
│ │ ├── RaritySidebar.js ------------------# RaritySidebar component
│ │ ├── home/ -----------------------------# Home-related components
│ │ │ ├── Countdownhome.css ---------------# Styles for Countdownhome component
│ │ │ └── Home.js -------------------------# Home component
│ │ │ └── ShiftingCountdown.jsx -----------# ShiftingCountdown component
│ │ ├── styles/ ---------------------------# Styles directory
│ │ │ ├── tailwind.css --------------------# Tailwind CSS file
│ │ │ ├── App.css -------------------------# Global styles for the app
│ │ │ └── index.js ------------------------# Index file for styles
│ │ └── reportWebVitals.js ----------------# Report web vitals
│ ├── .gitignore --------------------------# Git ignore file
│ ├── Dockerfile --------------------------# Docker configuration file
│ ├── package-lock.json -------------------# Lock file for npm dependencies
│ ├── package.json ------------------------# npm configuration file
│ ├── postcss.config.js -------------------# PostCSS configuration file
│ ├── README.md ---------------------------# Project README file
│ ├── tailwind.config.js ------------------# Tailwind CSS configuration file
│ └── yarn.lock ---------------------------# Lock file for Yarn dependencies
