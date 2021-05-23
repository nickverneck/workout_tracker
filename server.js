const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
require('dotenv').config();
// heroku port or 3000
const PORT = process.env.PORT || 3000;
const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(require("./controllers"));
// connecting to database
mongoose.connect(
  process.env.MONGODB_URL ,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);
// ----------------------------------------------------------
app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}!`);
  });