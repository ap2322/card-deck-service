var assert = require('chai').assert
var sinon = require('sinon');
var Deck = require("../models/deck");


function uniqueCount(array) {
  let unique = array.filter((value, index, self) => {
    return self.indexOf(value) === index;
  })

  return unique.length
}

describe('Test the deck class', () => {
  it('It should make an array of 52 cards', () => {
    const { deck } = new Deck();
    let length = deck.length

    assert.equal(length, 52)

    const initialDeck = [
      'AS',  '2S',  '3S',  '4S', '5S', '6S', '7S',
      '8S',  '9S',  '10S', 'JS', 'QS', 'KS', 'AD',
      '2D',  '3D',  '4D',  '5D', '6D', '7D', '8D',
      '9D',  '10D', 'JD',  'QD', 'KD', 'AH', '2H',
      '3H',  '4H',  '5H',  '6H', '7H', '8H', '9H',
      '10H', 'JH',  'QH',  'KH', 'AC', '2C', '3C',
      '4C',  '5C',  '6C',  '7C', '8C', '9C', '10C',
      'JC',  'QC',  'KC'
    ]

    assert.deepEqual(deck, initialDeck)
    assert.equal(uniqueCount(deck), 52)
  });


  it('It can shuffle the 52 card array', () => {
    const deck = new Deck();
    var stub = sinon.stub(Math, 'random').returns(.5);
    let shuffledDeck = deck.shuffle()
    const expectedDeck = [
        'AS', '8H', '2S',  'JC',  '3S',  '3C',  '4S',
        '4H', '5S', 'QH',  '6S',  '7C',  '7S',  '2H',
        '8S', '6H', '9S',  '10H', '10S', 'AC',  'JS',
        '5C', 'QS', '9C',  'KS',  'KC',  'AD',  '3H',
        '2D', '5H', '3D',  '7H',  '4D',  '9H',  '5D',
        'JH', '6D', 'KH',  '7D',  '2C',  '8D',  '4C',
        '9D', '6C', '10D', '8C',  'JD',  '10C', 'QD',
        'QC', 'KD', 'AH'
      ]

    assert.deepEqual(shuffledDeck.deck, expectedDeck)

    stub.restore();
  });

  it('It can create a 4 row, 13 column matrix of cards', () => {
     const deck = new Deck();
     const expectedMatrix = [
       ['AS',  '2S',  '3S',  '4S', '5S', '6S', '7S', '8S',  '9S',  '10S', 'JS', 'QS', 'KS' ],
       ['AD', '2D',  '3D',  '4D',  '5D', '6D', '7D', '8D', '9D',  '10D', 'JD',  'QD', 'KD'],
       ['AH', '2H', '3H',  '4H',  '5H',  '6H', '7H', '8H', '9H', '10H', 'JH',  'QH',  'KH'],
       ['AC', '2C', '3C', '4C',  '5C',  '6C',  '7C', '8C', '9C', '10C', 'JC',  'QC',  'KC']
     ]

     let dealtMatrix = deck.dealInMatrix()

     assert.deepEqual(dealtMatrix, expectedMatrix)
     assert.equal(dealtMatrix.length, 4)
     assert.equal(dealtMatrix[0].length, 13)
  })
})
