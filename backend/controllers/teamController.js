const Team = require("../models/teams");

const createTeam = async (req, res) => {
  try {
    const {title,description,requiredSkills,teamSize,} = req.body;

    const team = await Team.create({
      title,
      description,
      requiredSkills,
      teamSize,
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Team Created",
      team,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getTeams = async (req, res) => {
  try {
    const teams = await Team.find()
      .populate(
        "createdBy",
        "name email profilePic skills"
      )
      .sort({ createdAt: -1 });

    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate("createdBy","name email profilePic skills").populate("applicants.user","name email profilePic skills");

    if (!team) {
      return res.status(404).json({
        message: "Team not found",
      });
    }

    res.status(200).json(team);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const applyToTeam = async (req, res) => {
  try {
    const team = await Team.findById(
      req.params.id
    );

    if (!team) {
      return res.status(404).json({
        message: "Team not found",
      });
    }

    const alreadyApplied =
      team.applicants.some(
        (applicant) =>
          applicant.user.toString() ===
          req.user._id.toString()
      );

    if (alreadyApplied) {
      return res.status(400).json({
        message:
          "You have already applied",
      });
    }

    const application = {
      user: req.user._id,
      message: req.body.message,
    };

    team.applicants.push(application);

    await team.save();

    res.status(200).json({
      message:
        "Applied Successfully",
      applicants:
        team.applicants,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {createTeam,getTeams,getTeam,applyToTeam};