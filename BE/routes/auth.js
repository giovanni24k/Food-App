const express = require("express");
const { createJSONToken } = require("../util/auth.js");
const { getDB } = require("../config.js");

const router = express.Router();

const db = getDB();
const usersCollection = db.collection("users");

router.post("/signup", async (req, res, next) => {
  const data = req.body;
  let errors = {};

  try {
    const existingUser = await usersCollection.findOne({ email: data.email });
    if (existingUser) {
      errors.email = "Email already exists";
    }
  } catch (error) {}

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "User signup failed due to validation errors.",
      errors,
    });
  }

  try {
    const newUser = await usersCollection.insertOne(data);
    const authToken = createJSONToken(data.email, data.password);
    res
      .status(201)
      .json({ message: "User created", user: newUser, token: authToken });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await usersCollection.findOne({
      email: email,
      password: password,
    });

    if (user) {
      const token = createJSONToken(email, password);
      res.json({ token });
    } else {
      res
        .status(404)
        .send({ message: "User with these credentials not found!" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Authentication Failed." });
  }
});

module.exports = router;
