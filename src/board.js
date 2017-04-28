/**
* Return a random int between 0 and max - 1 
* @param {Number} max
* @returns {Number}
*/
const randint = max => Math.floor(Math.random() * max);

/**
* Duplicate an array
* @param {Array} array
* @returns {Array}
*/
const deepCopy = array => JSON.parse(JSON.stringify(array));

export default class Board {
  /**
  * Create a clear board defined by its size
  * and the number of bombs inside
  * @param {Number} width
  * @param {Number} height
  * @param {Number} nbBombs
  */
  constructor(width, height, nbBombs) {
    this.width = width > 0 ? width : 0;

    this.height = height > 0 ? height : 0;

    this.nbBombs = nbBombs > (width - 1) * (height - 1)
      ? (width - 1) * (height - 1)
      : nbBombs;
    this.nbBombs = this.nbBombs > 0 ? this.nbBombs : 0;

    const row = new Array(this.height);
    const board = new Array(this.width).fill([...row].fill(0));
    this.board = deepCopy(board);

    const displayBoard = new Array(this.width).fill(row);
    this.displayBoard = deepCopy(displayBoard);

    this.populated = false;
  }

  /**
  * Prettify the display of the board for a console.log
  */
  get rawBoard() {
    return JSON.stringify(this.board);
  }
  get rawDisplayBoard() {
    return JSON.stringify(this.displayBoard);
  }

  /**
  * Place the bombs in the board considering the first round because
  * during the first round, you cannot lose
  * @param {Number} x
  * @param {Number} y
  */
  populate(x, y) {
    if (x < 0 || x > this.width || y < 0 || y > this.height) {
      return;
    }
    if (!this.populated) {
      let currentBomb = 0;
      let xRand;
      let yRand;
      while (currentBomb < this.nbBombs) {
        xRand = randint(this.width);
        yRand = randint(this.height);
        if (!this.board[xRand][yRand] && (xRand !== x || yRand !== y)) {
          this.board[xRand][yRand] = 1;
          currentBomb += 1;
        }
      }
      console.log(this.rawBoard);
      this.populated = true;
    }
  }

  /**
  * Check if there is a bomb with coordinates (x, y)
  * and return 0 if (x, y) isn't in the bomb
  * @param {Number} x
  * @param {Number} y
  * @returns {Number}
  */
  check(x, y) {
    if (x < 0 || x > this.width || y < 0 || y > this.height) {
      return 0;
    }
    return this.board[x][y];
  }

  /**
  * Reveal the box with coordinates (x, y) and return either
  * • NaN if (x, y) if outside of the board
  * • -1 if their is a bomb
  * • a number between 0 and 8 corresponding to the number of bombs nearby
  * Also populate the board if not done already
  * @param {Number} x
  * @param {Number} y
  * @returns {Number}
  */ async reveal(
    x,
    y
  ) {
    if (!this.populated) {
      // Populate if necessary
      await this.populate(x, y);
    }
    if (x < 0 || x > this.width || y < 0 || y > this.height) {
      // Outside of the box
      return NaN;
    }
    if (this.displayBoard[x][y] !== null) {
      // Already discovered
      return this.displayBoard[x][y];
    }
    if (this.board[x][y]) {
      // Bomb
      this.displayBoard[x][y] = -1;
      return -1;
    }
    const nbBombsNB = // Number of bombs nearby
      this.check(x - 1, y - 1) +
      this.check(x - 1, y) +
      this.check(x - 1, y + 1) +
      this.check(x, y - 1) +
      this.check(x, y + 1) +
      this.check(x + 1, y - 1) +
      this.check(x + 1, y) +
      this.check(x + 1, y + 1);
    this.displayBoard[x][y] = nbBombsNB;
    if (nbBombsNB === 0) {
      // Propagate the reveal
      this.reveal(x - 1, y - 1);
      this.reveal(x - 1, y);
      this.reveal(x - 1, y + 1);
      this.reveal(x, y - 1);
      this.reveal(x, y + 1);
      this.reveal(x + 1, y - 1);
      this.reveal(x + 1, y);
      this.reveal(x + 1, y + 1);
    }
    return nbBombsNB;
  }
}
