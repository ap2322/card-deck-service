process.env.NODE_ENV = 'test'
const app = require("../app");
const chai = require("chai");
const mongoose = require("mongoose");
const DealtCards = require("../models/dealtCards")
const { assert } = chai;


describe("DealtCards Model Test", () => {
    it("Has DealtCards Attributes", done => {
      let newDeck = DealtCards.create(
        {dealtCardMatrix: [['mock deck'],['mock deck'],['mock deck'],['mock deck']], percentCorrect: .2 },
        (err, newDeck) => {
          assert.equal(newDeck.dealtCardMatrix.length, 4)
          assert.equal(newDeck.percentCorrect, .2)
          assert.property(newDeck, '_id')
        })
      done();
    });

    it("can calculate the statistics of all dealtCards", done => {

      let newDecks = [
        {dealtCardMatrix: ['mock deck'], percentCorrect: .2 },
        {dealtCardMatrix: ['mock deck'], percentCorrect: .15 },
        {dealtCardMatrix: ['mock deck'], percentCorrect: .1 },
        {dealtCardMatrix: ['mock deck'], percentCorrect: .3 },
      ]
      DealtCards.create(newDecks, async(err, dealtCard) => {
        let stats = await DealtCards.statistics()

        assert.equal(stats[0].percentCorrectAvg, 0.1875)
        assert.equal(stats[0].countAll, 4)
      })
      done();
    })

    afterEach(done => {
      console.log('done with test')
      mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(done);
      });
    });

})
