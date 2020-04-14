const mongoose = require('mongoose');

const dealtCardsSchema = mongoose.Schema({
  dealtCardMatrix: { type: Array, required: true },
  percentCorrect: { type: Number, required: true }
});

module.exports = mongoose.model('dealtCards', dealtCardsSchema);
