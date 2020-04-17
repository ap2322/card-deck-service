# Card Deck Service

Deployed At: http://carddeckservice-env.eba-3gk27fss.us-east-2.elasticbeanstalk.com/

Agile Project Board: https://github.com/users/ap2322/projects/2

### Introduction
Card Deck Service is an API that allows the client to retrieve a shuffled deck of cards dealt in a 4 row, 13 column matrix. It's primary purpose is as a backend for [Card Deck UI](https://github.com/ap2322/card-deck-ui/).


### Local Setup
- Clone down this repo and `cd` into its main directory
- Run `npm install` to install all dependencies
- Database in use is [MongoDB](https://docs.mongodb.com/manual/). Locally install before running in development or test.
- Run locally with either `npm start` or `npm run start:server`

### How To Run Tests
The test suite can be run with the following command: `npm test`

### Endpoint
This service is deployed at `http://carddeckservice-env.eba-3gk27fss.us-east-2.elasticbeanstalk.com`. To verify deployment, visit the [root path](http://carddeckservice-env.eba-3gk27fss.us-east-2.elasticbeanstalk.com/).

##### POST `/api/v1/deal`
Creates a deck of 52 cards that is then shuffled and dealt into a 4 x 13 matrix. A card deck is comprised of 52 cards with 4 suits and 13 values. This dealt card matrix is saved in the database. The response body of creating this shuffled and dealt card deck includes the dealt card matrix.

**`percentCorrect`**: The `dealtCardMatrix` is also compared to "correct" card placements as determined by suit and value. A card can get a point for having the correct suit in it's assigned row. Another point can be awarded for a card having the correct value in the assigned column. Total points available are 104. A card's percentage of points out of the total is calculated and persisted in the database as `percentCorrect`.

**`statistics`**: Statistics for the entire collection of dealt cards in the database is calculated and returned with each request. It returns the total number of documents in the dealt cards collection with `decksDealt` and the average of all `percentCorrect` scores with `averagePercentageCorrect`.

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
            [
                "AC",
                "2H",
                "AS",
                "10H",
                "2S",
                "6D",
                "9S",
                "QC",
                "9D",
                "3C",
                "5C",
                "4D",
                "JS"
            ],
            [
                "3H",
                "KH",
                "9H",
                "4C",
                "10S",
                "8C",
                "AD",
                "7D",
                "6S",
                "QD",
                "7H",
                "5H",
                "AH"
            ],
            [
                "2D",
                "KS",
                "KC",
                "7S",
                "8H",
                "JD",
                "8S",
                "10C",
                "9C",
                "6C",
                "7C",
                "KD",
                "QS"
            ],
            [
                "4S",
                "JC",
                "JH",
                "6H",
                "3S",
                "5S",
                "2C",
                "8D",
                "QH",
                "3D",
                "4H",
                "5D",
                "10D"
            ]
        ],
        "percentCorrect": 0.16,
        "statistics": {
            "decksDealt": 24,
            "averagePercentageCorrect": 0.17
        }
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
