const express = require('express');
const router = express.Router();
// make model for card deck and import it
const Deck = require('../models/deck.js')
const DealtCards = require('../models/dealtCards.js')



router.post("", (req, res, next) => {
  console.log('made it to router')

  const deck = new Deck();
  const dealtCards = new DealtCards({
    dealtCardMatrix: deck.shuffle().dealInMatrix()
  })

  dealtCards.save()
    .then(result => {
      res.status(201).json({
        message: 'Cards shuffled and dealt successfully',
        data: result
      })
    })
    .catch(result => console.log('Error saving a new post'))
});

module.exports = router;
