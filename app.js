require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// const postsRoutes = require("./routes/posts")
const dealCardsRoutes = require("./routes/dealCards")

const app = express();
const environment = process.env.NODE_ENV || 'development';
console.log("environment", environment)
if (environment === 'production') {
  mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@cluster0-0bjmx.mongodb.net/${environment}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to database!")
    })
    .catch(() => {
      console.log("Connection failed")
    })
} else if (environment === 'development') {
  mongoose.connect("mongodb://localhost/cardDeck_dev",
    { useNewUrlParser: true, useUnifiedTopology: true });
  mongoose.connection
    .once('open', () => console.log('Connected to cardDeck_dev'))
    .on('error', (error) => {
      console.warn('Warning', error);
    })
} else if (environment === 'test') {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/cardDeck_test',
      { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection
      .once('open', () => console.log('Connected to cardDeck_test'))
      .on('error', (error) => {
        console.warn('Warning', error);
      })
}

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

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome To Card-Deck API" });
});

// app.use("/api/posts", postsRoutes);
app.use("/api/v1/deal", dealCardsRoutes);


module.exports = app;
