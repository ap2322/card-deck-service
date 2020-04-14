process.env.NODE_ENV = 'test'
const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const DealtCards = require("../models/dealtCards")

const { expect } = chai;
chai.use(chaiHttp);

describe("Deal Endpoint", () => {
  it("Deals a deck of cards in a 4x13 matrix", done => {
    chai
      .request(app)
      .post("/api/v1/deal")
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equals("Cards shuffled and dealt successfully");
        expect(res.body.data.dealtCardMatrix).to.be.an('array');
        expect(res.body.data.dealtCardMatrix.length).to.equal(4);
        expect(res.body.data.dealtCardMatrix[0].length).to.equal(13);
        expect(res.body.data.percentCorrect).to.be.a('number');
        done();
      });
  });

  it("Adds dealtCards to the database after hitting the POST /deal endpoint", () => {
    DealtCards.find()
      .then((dealtCards) => {
        expect(dealtCards.length).to.equal(1);
        expect(dealtCards[0].dealtCardMatrix).to.be.an('array');
        expect(dealtCards[0].dealtCardMatrix.length).to.equal(4);
        expect(dealtCards[0]).to.have.property('_id').that.is.a('string');
        expect(dealtCards[0]).to.have.property('percentCorrect').that.is.a('number');
      })
      .catch(error=> error)
  })

  after(done => {
    console.log('done with test')
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });
});
