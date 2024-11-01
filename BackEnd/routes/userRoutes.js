const {
  signUp,
  login,
  getUserDetails,
} = require("../controllers/userController");
const verifyToken = require("../middleware/authMiddleware");

const Router = require("express").Router();

Router.post("/signup", signUp);
Router.post("/login", login);
Router.get("/", verifyToken, getUserDetails);

module.exports = Router;
