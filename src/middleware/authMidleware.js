const jwt = require("jsonwebtoken");

module.exports.authMidleware = (req, res, next) => {
  const token = req.headers.authorization;

  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if (err) {
      res.json("Prašome prisijungti");
    } else {
      next();
    }
  });
};
