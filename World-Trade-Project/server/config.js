// filepath: /home/terorx/World-Trade-Project/server/config.js
module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || 5432,
  DB_USER: process.env.DB_USER || 'wtdb',
  DB_PASS: process.env.DB_PASS || 'ZbgYKGGKQE8aTSGPZGD47A',
  DB_NAME: process.env.DB_NAME || 'world_trade_db',
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
};