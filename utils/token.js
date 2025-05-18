const jwt = require("jsonwebtoken");

exports.createToken = async ({ id, password }) => {
  const decoded = jwt.sign({ id }, password, {
    expiresIn: 100000,
  });
  return decoded;
};
