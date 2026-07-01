const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password } =
      req.body;

    const userExists =
      await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
  message: "User Registered",
  user: {
    _id: user._id,
    name: user.name,
    email: user.email,
  },
});
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getMe = async (req, res) => {
  res.status(200).json(req.user);
};

const updateProfile = async (req , res) => {
  const {name , branch , year , bio , skills , profilePic , resume} = req.body;
  const user = await User.findById(req.user._id);
  if(!user){
    return res.status(404).json({
      message:"USER NOT FOUND",
    });
  }
  user.name = name || user.name;
  user.branch = branch || user.branch;
  user.year = year || user.year;
  user.bio = bio || user.bio;
  user.skills = skills || user.skills;
  user.profilePic =
  profilePic || user.profilePic;
  user.resume = resume || user.resume;

  await user.save();

  user.password = undefined;

  res.status(200).json({
    message: "Profile Updated",user,
    });
}




module.exports = {register, login , getMe , updateProfile};