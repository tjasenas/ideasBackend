const express = require("express");
const { getAllIdeas, acceptIdea, removeIdea, ecceptedIdeas, addIdea } = require("../controllers/ideasController");
const ideasRouter = express.Router();

ideasRouter.get("/api/admin/ideas", getAllIdeas); // For admin
ideasRouter.post("/api/admin/acceptIdea", acceptIdea); // For admin
ideasRouter.delete("/api/admin/idea/:ideaId", removeIdea); // For admin

ideasRouter.get("/api/ideas", ecceptedIdeas); // public get all ideas ( only accepted )
ideasRouter.post("/api/addIdea", addIdea); // public add idea

module.exports = {
  ideasRouter,
};
