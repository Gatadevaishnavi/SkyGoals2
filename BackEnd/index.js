const express = require("express");
const dbConnect = require("./config/dbconnect");
require("dotenv").config();
const authRoutes = require("./routes/userRoutes");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// to convert json
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONT_END_URL,
  })
);

//routes middleware
app.use("/api/users/", authRoutes);

// calling db
dbConnect();

app.listen(port, () => {
  console.log(`Sever listening on ${port}`);
});
