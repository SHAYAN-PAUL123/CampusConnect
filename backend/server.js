const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const connectDB = require("./config/db");
connectDB();

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const postRoutes = require("./routes/postRoutes");
app.use("/api/posts" , postRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const teamRoutes = require("./routes/teamRoutes");
app.use("/api/team", teamRoutes);

app.listen(3000, () => {
  console.log("Port is running on port 3000");
});


//@middlewares
//@applyToTeams