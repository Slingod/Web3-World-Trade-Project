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

.vscode
client
├── node_modules # 📦 Dependencies installed via npm/yarn
│ # 🇫🇷 Dépendances installées via npm/yarn
├── public # 🌍 Static assets accessible in the public folder
│ # 🇫🇷 Fichiers statiques accessibles publiquement
└── src # 📜 Source code for the application
├── assets # 🖼️ Images, icons, and other static files
│ ├── logo.svg # 🎨 Application logo
│ └── icons/ # 🎭 Folder for SVG or PNG icons
├── components # 🏗️ UI components
│ ├── common # 🔁 Reusable components
│ │ ├── EncryptButton.js # 🔐 Button for encryption
│ │ ├── Footer.js # 🔽 Footer component
│ │ ├── Sidebar.js # 📜 Sidebar navigation
│ │ └── ThemeToggle.js # 🌗 Theme switcher
│ ├── game # 🎮 Components related to game objects
│ │ ├── GameObjectsList.js # 📋 List of game items
│ │ ├── RaritySidebar.js # 🌟 Sidebar for item rarity
│ │ └── CurrentVersion.js # 🔄 Shows current game version
│ ├── home # 🏠 Homepage-related components
│ │ ├── Home.js # 🏡 Main home page
│ │ ├── ShiftingCountdown.js # ⏳ Animated countdown
│ │ └── CountdownHome.js # ⏱️ Static countdown timer
│ ├── auth # 🔑 Authentication components
│ │ ├── Login.js # 👤 Login form
│ │ ├── Register.js # 📝 Register form (if needed)
│ │ └── AuthForm.js # 🔄 Combined login/register form
├── contexts # 🎛️ Global context management
│ ├── ThemeContext.js # 🌙 Context for dark/light mode
│ └── AuthContext.js # 🔑 Context for user authentication
├── hooks # ⚓ Custom React hooks
│ ├── useFetch.js # 🔄 Hook for fetching API data
│ ├── useTheme.js # 🎨 Hook for theme management
│ └── useAuth.js # 🔐 Hook for authentication logic
├── services # 📡 API communication services
│ ├── api.js # 🔗 Base API setup (Axios instance)
│ ├── authService.js # 🔑 Authentication-related API calls
│ ├── gameService.js # 🎮 Game-related API calls
│ └── userService.js # 👤 User-related API calls
├── styles # 🎨 CSS and Tailwind styles
│ ├── components # 📌 Component-specific styles
│ │ ├── EncryptButton.css
│ │ ├── Footer.css
│ │ ├── GameObjectsList.css
│ │ ├── Login.css
│ │ ├── Sidebar.css
│ │ └── DiscordFooter.css
│ ├── tailwind.css # 🎨 Tailwind global styles
│ └── globals.css # 🎭 General styles (CSS variables, resets...)
├── App.js # 🏡 Root React component
├── App.css # 🎨 Global app styles
├── index.js # 🚀 React entry point
├── config.js # ⚙️ Configuration file (API keys, env variables)
├── .gitignore # 🚫 Files ignored by Git
├── Dockerfile # 🐳 Docker setup for deployment
├── package-lock.json # 📦 Locked dependency tree
├── package.json # 📦 Project dependencies and scripts
├── postcss.config.js # 🎨 PostCSS configuration
├── README.md # 📖 Project documentation
└── tailwind.config.js # 🎨 TailwindCSS configuration
