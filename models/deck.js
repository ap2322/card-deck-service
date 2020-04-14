class Deck {
  constructor() {
    this.deck = [];

    const suits = ['S', 'D', 'H', 'C'];
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

  calculatePoints() {
    const deckMatrix = this.dealInMatrix();
    const correctSuitOrder = [ 'S', 'D', 'H', 'C'];
    const correctValueOrder = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '1', 'J', 'Q', 'K'];
    let correctSuitCount = 0;
    let correctValueCount = 0;

    for (let r=0; r < deckMatrix.length; r++) {
      let row = deckMatrix[r];
      for (let c=0; c < row.length; c++) {
        let lastCharIndex = row[c].length - 1
        if (row[c].charAt(lastCharIndex) === correctSuitOrder[r]) {
          correctSuitCount++;
        }
        if (row[c].charAt(0) === correctValueOrder[c]){
          correctValueCount++;
        }
      }
    }

    return correctSuitCount + correctValueCount;
  }

}

module.exports = Deck;
