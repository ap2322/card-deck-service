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
        done();
      });
  });

  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });
});
