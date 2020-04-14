const express = require('express');
const router = express.Router();

const Deck = require('../models/deck.js')
const DealtCards = require('../models/dealtCards.js')



router.post("", (req, res, next) => {
  const deck = new Deck();
  const shuffledDeck = deck.shuffle();

  const dealtCards = new DealtCards({
    dealtCardMatrix: shuffledDeck.dealInMatrix(),
    percentCorrect: shuffledDeck.percentCorrect()
  })

  dealtCards.save()
    .then(result => {
      res.status(201).json({
        message: 'Cards shuffled and dealt successfully',
        data: {
          dealtCardMatrix: result.dealtCardMatrix,
          percentCorrect: result.percentCorrect
        }
      })
    })
    .catch(result => console.log('Error saving a new post'))
});

module.exports = router;
