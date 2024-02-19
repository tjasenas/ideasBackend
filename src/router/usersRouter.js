const express = require("express");
const { login, register, favorites, addTofavorite, userFavorites, removeFromFavorites } = require("../controllers/usersController");

const usersRouter = express.Router();

usersRouter.post("/api/login", login);

module.exports = {
  usersRouter,
};
