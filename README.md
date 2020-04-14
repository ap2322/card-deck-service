Card Deck Service
- shuffles cards
- deals them in a 13 x 4 grid
- calculates their "correct" positions

# Card Deck Service

### Introduction
Agile Project Board: https://github.com/ap2322/card-deck-service/projects/1

Card Deck Service is an API that allows the client to retrieve a shuffled deck of cards dealt in a 4 row, 13 column matrix. It's primary purpose is as a backend for Card Deck UI.

### Initial Setup
- Clone down this repo and `cd` into its main directory
- Run `npm install` to install all dependencies
- Create databases for development and testing by running the following commands:
```
psql
CREATE DATABASE play_dev
CREATE DATABASE play_test
\q
```
- Run `knex migrate:latest` to set up your development database
- Run `knex migrate:latest --env test` before running any tests to set up the test database

### How To Run Tests
The test suite can be run with the following command: `npm test`

### How To Use
- All request URLs should begin with 

##### POST `/api/v1/deal`
Creates a deck of 52 cards that is then shuffled and dealt into a 4 x 13 matrix. A card deck is comprised of 52 cards with 4 suits and 13 values. This dealt card matrix is saved in the database. The response body of creating this shuffled and dealt card deck includes the dealt card matrix.

Example request:
```
POST  http://localhost:3000/api/v1/deal
```

Example success response:
```
status 201
body:
{
  "message": "Cards shuffled and dealt successfully",
  "data": {
      "dealtCardMatrix": [
            [   "6H",
                "QS",
                "2D",
                "6C",
                "10C",
                "6D",
                "6S",
                "QH",
                "4H",
                "9C",
                "2H",
                "AH",
                "JD"
             ],
            [
                "9H",
                "4D",
                "7D",
                "5D",
                "AC",
                "10H",
                "3D",
                "3H",
                "2C",
                "10S",
                "5C",
                "KD",
                "2S"
            ],
            [
                "3S",
                "JC",
                "4C",
                "KH",
                "5S",
                "AS",
                "8H",
                "8D",
                "5H",
                "7S",
                "8C",
                "10D",
                "9S"
            ],
            [
                "JS",
                "8S",
                "KC",
                "KS",
                "AD",
                "QD",
                "4S",
                "7C",
                "JH",
                "7H",
                "3C",
                "9D",
                "QC"
            ],
       ]
   }
}
```


### Tech Stack List
- MongoDB (database)
- Node.JS (Main language)
- Express (Backend framework)
- Mongoose (ODM)
- Mocha, Chai, Chai HTTP, Sinon (Testing)

### Core Contributor
- [Alice Post](https://github.com/ap2322)
