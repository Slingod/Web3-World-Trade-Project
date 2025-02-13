// utils/validators.js

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;
const pseudoRegex = /^[a-zA-Z0-9_-]{3,32}$/;

module.exports = {
  emailRegex,
  passwordRegex,
  pseudoRegex
};
