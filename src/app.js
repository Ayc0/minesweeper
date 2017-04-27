import React, { Component } from 'react';
import { styled } from 'styletron-react';

const Test = styled('div', () => ({
  height: '20px',
  width: '20px',
  backgroundColor: 'black',
}));

export default class App extends Component {
  handleClick() {
    console.log('click');
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
      <Test
        onClick={this.handleClick}
        onDoubleClick={this.handleDblClick}
        onContextMenu={this.handleRightClick}
      />
    );
  }
}
