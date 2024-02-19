const express = require("express");
const { getAllIdeas, acceptIdea, removeIdea, ecceptedIdeas, addIdea, donate, donateList } = require("../controllers/ideasController");
const { authMidleware } = require("../middleware/authMidleware");
const ideasRouter = express.Router();

ideasRouter.get("/api/admin/ideas", getAllIdeas); // For admin ++
ideasRouter.put("/api/admin/acceptIdea/:ideaId", acceptIdea); // For admin++
ideasRouter.delete("/api/admin/ideas/:ideaId", removeIdea); // For admin++

ideasRouter.get("/api/ideas", ecceptedIdeas); // public get all ideas ( only accepted ) ++
ideasRouter.post("/api/addIdea", addIdea); // public add idea ++
ideasRouter.post("/api/donate", donate); // public add idea ++
ideasRouter.get("/api/donated/:ideaId", donateList); // public donated List ++

module.exports = {
  ideasRouter,
};
