import React, { Component } from 'react';

import Tile from './tile';
import Board from './board';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleDblClick = this.handleDblClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
  }
  componentWillMount() {
    this.board = new Board(10, 10, 3);
  }
  handleClick(x, y) {
    this.board.reveal(x, y).then(value => {
      this.forceUpdate();
      if (this.board.allRevealed) {
        alert('Gagné');
      }
      if (value === -1) {
        alert('Perdu');
      }
    });
  }
  handleDblClick() {
    console.log('double click');
  }
  handleRightClick(e) {
    e.preventDefault();
    console.log('right click');
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
              <Tile onClick={this.handleClick} key={[x, y]} x={x} y={y}>
                {this.board.displayBoard[x][y]}
              </Tile>
            );
          })}
        </div>
      );
    });
    return <div>{displayBoard}</div>;
  }
}
