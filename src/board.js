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
    this.width = this.width > 24 ? 24 : this.width;

    this.height = height > 0 ? height : 0;
    this.height = this.height > 30 ? 30 : this.height;

    this.nbBombs = nbBombs > (this.width - 1) * (this.height - 1)
      ? (this.width - 1) * (this.height - 1)
      : nbBombs;
    this.nbBombs = this.nbBombs > 0 ? this.nbBombs : 0;

    const row = new Array(this.height);
    const board = new Array(this.width).fill([...row].fill(0));
    this.board = deepCopy(board);

    const displayBoard = new Array(this.width).fill(row);
    this.displayBoard = deepCopy(displayBoard);

    this.populated = false;
    this.nbRevealedTiles = 0;
    this.nbFlags = 0;
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
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
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
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return 0;
    }
    return this.board[x][y];
  }

  /**
  * Reveal the tile with coordinates (x, y)
  * and complete the displayBoard with :
  * • NaN if (x, y) if outside of the board
  * • -1 if their is a bomb
  * • a number between 0 and 8 corresponding to the number of bombs nearby
  * Also populate the board if not done already
  * @param {Number} x
  * @param {Number} y
  * @returns {Object}
  */ async reveal(
    x,
    y
  ) {
    if (!this.populated) {
      // Populate if necessary
      await this.populate(x, y);
    }
    if (
      x < 0 ||
      x >= this.width ||
      y < 0 ||
      y >= this.height ||
      this.displayBoard[x][y] !== null
    ) {
      // Outside of the board or already discovered
      return null;
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
    this.nbRevealedTiles += 1;
    if (nbBombsNB === 0) {
      // Propagate the reveal
      await this.revealCircle(x, y);
    }
    return nbBombsNB;
  }
  /**
  * Reveal the tiles surrounding the coordinates (x, y)
  * @param {Number} x
  * @param {Number} y
  */ async revealCircle(
    x,
    y
  ) {
    const results = [];
    await this.reveal(x - 1, y - 1).then(v => results.push(v));
    await this.reveal(x - 1, y).then(v => results.push(v));
    await this.reveal(x - 1, y + 1).then(v => results.push(v));
    await this.reveal(x, y - 1).then(v => results.push(v));
    await this.reveal(x, y + 1).then(v => results.push(v));
    await this.reveal(x + 1, y - 1).then(v => results.push(v));
    await this.reveal(x + 1, y).then(v => results.push(v));
    await this.reveal(x + 1, y + 1).then(v => results.push(v));
    return results;
  }
  /**
  * Check if there is a flag in the tile with coordinates (x, y)
  * @param {Number} x
  * @param {Number} y
  * @returns {Bool}
  */ checkFlag(
    x,
    y
  ) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return false;
    }
    return this.displayBoard[x][y] === -2;
  }
  async revealCircleSecure(x, y) {
    if (this.displayBoard[x][y] <= 0) {
      return 0;
    }
    const nbFlagsNB = // Number of bombs nearby
      this.checkFlag(x - 1, y - 1) +
      this.checkFlag(x - 1, y) +
      this.checkFlag(x - 1, y + 1) +
      this.checkFlag(x, y - 1) +
      this.checkFlag(x, y + 1) +
      this.checkFlag(x + 1, y - 1) +
      this.checkFlag(x + 1, y) +
      this.checkFlag(x + 1, y + 1);
    let bomb = false;
    if (nbFlagsNB === this.displayBoard[x][y]) {
      await this.revealCircle(x, y).then(results => {
        if (results.filter(v => v === -1).length > 0) {
          bomb = true;
        }
      });
    }
    return bomb;
  }
  /**
  * Check if all tiles are revealed
  * returns {Boolean}
  */ get allRevealed() {
    return this.nbRevealedTiles + this.nbBombs === this.width * this.height;
  }
  /** 
  * Circle between empty, flag and question mark the tile with
  * coordinates (x, y)
  * @param {Number} x
  * @param {Number} y
  */ async toggleFlag(
    x,
    y
  ) {
    switch (this.displayBoard[x][y]) {
      case null:
        this.displayBoard[x][y] = -2;
        this.nbFlags += 1;
        return -2;
      case -2:
        this.displayBoard[x][y] = -3;
        this.nbFlags -= 1;
        return -3;
      case -3:
        this.displayBoard[x][y] = null;
        return null;
      default:
        return this.displayBoard[x][y];
    }
  }
}
