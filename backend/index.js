require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose')
const userRoute = require('./routes/userRoute');

const port = 3001;
const app = express();

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = process.env.COMPASS_URI;
const db_name = 'chatlingo';

mongoose.connect(uri+db_name, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/user", userRoute);

const connection = mongoose.connection;
connection.once("open", async () => {
  console.log("Connected to MongoDB");
});

app.listen(port, (req, res) => {
  console.log("Server active on port 3001");
});
