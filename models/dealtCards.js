const mongoose = require('mongoose');

const dealtCardsSchema = mongoose.Schema({
  dealtCardMatrix: { type: Array, required: true }
});

module.exports = mongoose.model('dealtCards', dealtCardsSchema);
