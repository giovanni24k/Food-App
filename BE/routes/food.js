const express = require("express");

const axios = require("axios");
const https = require("https");

const router = express.Router();

const TOKEN_YELP = process.env.TOKEN_YELP;

const EDEM_APP_ID = process.env.EDEM_APP_ID;
const EDEM_APP_KEY = process.env.EDEM_APP_KEY;

const configYELP = {
  headers: {
    Authorization: `Bearer ${TOKEN_YELP}`,
    accept: "application/json",
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
};

router.get("/getAllFoodStores", async (req, res) => {
  const address = req.query.address;
  const URI_YELP = `https://api.yelp.com/v3/businesses/search?location=${encodeURIComponent(
    address
  )}&limit=40`;

  try {
    const response = await axios.get(URI_YELP, configYELP);
    res.status(200).json({
      message: `Food Stores near ${address} founded successfully!`,
      data: response.data.businesses,
    });
  } catch (error) {
    if (error.response.status === 400) {
      res
        .status(400)
        .json({ message: "Cannot find you address!", error: error });
    } else {
      res.status(500).json({ message: "Something Went Wrong!", error: error });
    }
  }
});

router.get("/getAllRecipesForCategory", async (req, res) => {
  const category = req.query.category;
  const URI_EDAMAM = `https://api.edamam.com/api/food-database/v2/parser?app_id=${EDEM_APP_ID}&app_key=${EDEM_APP_KEY}&ingr=${category}&nutrition-type=cooking&category=generic-foods`;

  try {
    const response = await axios.get(URI_EDAMAM, {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });

    return res.status(200).json({
      message: `Food Recipes founded for category ${category}!`,
      data: response.data.hints,
    });
  } catch (error) {
    if (error.response.status === 400) {
      res.status(400).json({
        message: "Cannot find food recipes for this category!",
        error: error,
      });
    } else {
      res.status(500).json({ message: "Something Went Wrong!", error: error });
    }
  }
});

module.exports = router;
