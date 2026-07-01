const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {createTeam,getTeams,getTeam, applyToTeam,} = require("../controllers/teamController");

router.post("/",protect,createTeam);

router.get("/", getTeams);

router.get("/:id", getTeam);

router.post("/:id/apply", protect, applyToTeam);

module.exports = router;