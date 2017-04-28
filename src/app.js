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
    this.board = new Board(5, 5, 4);
    this.board.reveal(0, 0).then(console.log);
  }
  handleClick() {
    this.board.reveal(0, 2).then(v => {
      console.log(v);
      console.log(this.board.rawDisplayBoard);
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
    return (
      <div>
        <Tile
          onClick={this.handleClick}
          onDoubleClick={this.handleDblClick}
          onContextMenu={this.handleRightClick}
        />
      </div>
    );
  }
}
