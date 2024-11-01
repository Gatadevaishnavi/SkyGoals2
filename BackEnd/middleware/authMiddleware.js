const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  //taking value of token
  
  const token = req.headers.authorization;
  if (!token) return res.status(401).send({message  : "Please provide a token"})

  const authToken = token.split(" ")[1];
  //verify token
  jwt.verify(authToken, process.env.SECRETKEY, (err, payload) => {
    if (err) {
      res.send({ message: "token is invalid" });
    } else {
      req.user = payload;
      next();
    }
  });
};

module.exports = verifyToken;
