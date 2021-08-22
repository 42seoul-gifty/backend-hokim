const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();

module.exports = (password) => {
  return crypto
    .createHash("sha512")
    .update(password + process.env.SALT)
    .digest("base64");
};
