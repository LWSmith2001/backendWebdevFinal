require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
// const { logger } = require("./middleware/logEvents");
// const errorHandler = require("./middleware/errorHandler");
// const corsOptions = require("./config/corsOptions");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConfig");
const PORT = process.env.PORT || 3000;

connectDB();

// app.use(logger);

// app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "/public")));

// routes
app.use("/", require("./routes/index"));
app.use("/states", require("./routes/api/states"));

app.all("*", (req, res) => {
  res.json({message : "404 page not found"});
});

// app.use(errorHandler)

mongoose.connection.once("open", () => {
  console.log("Connected to mongoDB");
  app.listen(PORT, () => console.log(`Server is listing on port ${PORT}`));
});