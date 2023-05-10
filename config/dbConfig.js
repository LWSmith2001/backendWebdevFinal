const mongoose = require("mongoose");

const connectDB = async() => {
  try {
    await mongoose.connect(
      "mongodb+srv://lwsmith2:AyxjsjlbisJ8xbcz@cluster0.kmrvsub.mongodb.net/?retryWrites=true&w=majority",//AyxjsjlbisJ8xbcz
      {
        useUnifiedTopology: true,
        useNewUrlParser: true
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;