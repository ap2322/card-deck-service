require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// const postsRoutes = require("./routes/posts")
const dealCardsRoutes = require("./routes/dealCards")

const app = express();

mongoose.connect(`mongodb+srv://ap2322:${process.env.MONGO_PW}@cluster0-0bjmx.mongodb.net/test?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database!")
  })
  .catch(() => {
    console.log("Connection failed")
  })

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log('origin', req.headers.host);
  if (req.headers.host === 'localhost:3000') {
    res.setHeader("Access-Control-Allow-Origin", 'http://localhost:3000');
  } else {
    res.setHeader("Access-Control-Allow-Origin", process.env.S3_URL);
  }
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  )
  next()
});

// app.use("/api/posts", postsRoutes);
app.use("/api/v1/deal", dealCardsRoutes);


module.exports = app;
