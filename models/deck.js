class Deck {
  constructor() {
    this.deck = [];

    const suits = ['H', 'S', 'C', 'D'];
    const values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];

    for (let suit in suits) {
      for (let value in values) {
        this.deck.push(`${values[value]}${suits[suit]}`);
      }
    }
  }

  shuffle() {
    const { deck } = this;

    for (let i = deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    return this;
  }

  dealInMatrix() {
    const { deck } = this;
    var deckMatrix = [];

    var i,j,row,columns = 13;
    for (i=0,j=deck.length; i<j; i+=columns) {
        row = deck.slice(i,i+columns);
        deckMatrix.push(row);
    }
    return deckMatrix;
  }

}

module.exports = Deck;
