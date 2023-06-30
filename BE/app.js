const express = require("express");
const cors = require("cors");

const { connectDB } = require("./config.js");
const authRoutes = require("./routes/auth.js");
const foodRoutes = require("./routes/food.js");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/user", authRoutes);
app.use("/api/food", foodRoutes);

app.listen(8080, () => console.log("Server is running"));
