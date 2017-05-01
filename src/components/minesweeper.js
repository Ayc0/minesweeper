import React, { Component } from 'react';

import Tile from './tile';
import Board from '../board';

export default class Minesweeper extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleDblClick = this.handleDblClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
  }
  componentWillMount() {
    this.board = new Board(
      this.props.width,
      this.props.height,
      this.props.bombs
    );
  }
  handleClick(x, y) {
    this.board.reveal(x, y).then(value => {
      this.forceUpdate();
      if (this.board.allRevealed) {
        console.log('Gagné');
      }
      if (value === -1) {
        console.log('Perdu');
      }
    });
  }
  handleDblClick() {
    console.log('double clic');
  }
  handleRightClick(e, x, y) {
    e.preventDefault();
    this.board.toggleFlag(x, y).then(this.forceUpdate());
  }
  render() {
    let x = -1;
    let y;
    const displayBoard = this.board.displayBoard.map(row => {
      y = -1;
      x += 1;
      return (
        <div style={{ display: 'flex', flexDirection: 'row' }} key={x}>
          {row.map(() => {
            y += 1;
            return (
              <Tile
                onClick={this.handleClick}
                onContextMenu={this.handleRightClick}
                key={[x, y]}
                x={x}
                y={y}
                value={this.board.displayBoard[x][y]}
              />
            );
          })}
        </div>
      );
    });
    return (
      <div>
        <div>
          {displayBoard}
        </div>
      </div>
    );
  }
}
