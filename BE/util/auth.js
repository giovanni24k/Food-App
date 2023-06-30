const { sign, verify } = require("jsonwebtoken");
const dotenv = require("dotenv");

const { NotAuthError } = require("../util/errors");

dotenv.config();

const KEY = process.env.SECRET_KEY;

const createJSONToken = (email, password) => {
  return sign({ email, password }, KEY, { expiresIn: "1h" });
};

const validateJSONToken = (token) => {
  return verify(token, KEY);
};

const checkAuthMiddleware = (req, res, next) => {
  try {
    const authFragments = req.headers.authorization.split(" ");

    if (authFragments.length !== 2) {
      console.log("NOT AUTH. AUTH HEADER INVALID");
      return next(new NotAuthError("Not Authenticated"));
    }

    const authToken = authFragments[1];

    const validateToken = validateJSONToken(authToken);
    req.token = validateToken;
  } catch (error) {
    console.log("NOT AUTH. TOKEN INVALID");
    return next(new NotAuthError("Not Authenticated"));
  }
  next();
};

exports.createJSONToken = createJSONToken;
exports.checkAuthMiddleware = checkAuthMiddleware;
exports.createJSONTovalidateJSONTokenken = validateJSONToken;
