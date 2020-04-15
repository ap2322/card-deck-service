const mongoose = require('mongoose');

const dealtCardsSchema = mongoose.Schema({
  dealtCardMatrix: { type: Array, required: true },
  percentCorrect: { type: Number, required: true }
});

dealtCardsSchema.static('statistics', function() {
  return this.aggregate([
    { $group: {
        _id: null,
        percentCorrectAvg: { $avg: "$percentCorrect"},
        percentCorrectSum: { $sum: "$percentCorrect"},
        countAll: { $sum: 1 }
    }}
  ])
});

module.exports = mongoose.model('dealtCards', dealtCardsSchema);
