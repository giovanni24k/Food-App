const MongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.URL;
const client = new MongoClient(uri);

const connectDB = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    return client.db();
  } catch (error) {
    throw new Error(error);
  }
};

const getDB = () => {
  try {
    return client.db();
  } catch (error) {
    throw new Error(error);
  }
};

exports.connectDB = connectDB;
exports.getDB = getDB;
