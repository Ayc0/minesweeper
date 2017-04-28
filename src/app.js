import React, { Component } from 'react';

import Tile from './tile';
import Board from './board';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { board: {} };

    this.handleClick = this.handleClick.bind(this);
    this.handleDblClick = this.handleDblClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
  }
  componentWillMount() {
    const board = new Board(25, 25, 10);
    this.board = board;
    this.setState(() => ({ board: board.displayBoard }));
  }
  handleClick(x, y) {
    this.board.reveal(x, y).then(board => {
      console.log(board);
      this.setState(() => ({
        board,
      }));
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
    const displayBoard = this.state.board.map(row => {
      y = -1;
      x += 1;
      return (
        <div style={{ display: 'flex', flexDirection: 'row' }} key={x}>
          {row.map(() => {
            y += 1;
            return (
              <Tile onClick={this.handleClick} key={[x, y]} x={x} y={y}>
                {this.state.board[x][y]}
              </Tile>
            );
          })}
        </div>
      );
    });

    return <div>{displayBoard}</div>;
  }
}
