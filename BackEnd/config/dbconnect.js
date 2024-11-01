const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to Database");
  } catch (error) {
    console.log({ message: error.message });
  }
};

module.exports = dbConnect;
