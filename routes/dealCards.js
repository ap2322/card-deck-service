const express = require('express');
const router = express.Router();

const Deck = require('../models/deck.js')
const DealtCards = require('../models/dealtCards.js')

router.post("", async (req, res, next) => {
  const deck = new Deck();
  const shuffledDeck = deck.shuffle();

  const dealtCards = new DealtCards({
    dealtCardMatrix: shuffledDeck.dealInMatrix(),
    percentCorrect: shuffledDeck.percentCorrect()
  })

  try {
    let savedDeck = await dealtCards.save();
    let stats = await DealtCards.statistics();

    res.status(201).json({
      message: 'Cards shuffled and dealt successfully',
      data: {
        dealtCardMatrix: savedDeck.dealtCardMatrix,
        percentCorrect: savedDeck.percentCorrect,
        statistics: {
          decksDealt: stats[0].countAll,
          averagePercentageCorrect: +stats[0].percentCorrectAvg.toFixed(2)
        }
      }
    })
  } catch (error){
    console.log(error);
    res.status(400).json({message: 'Error dealing cards'})
  }
});

module.exports = router;
