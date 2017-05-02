import React, { Component } from 'react';
import { styled } from 'styletron-react';

import Menu from './menu';
import Minesweeper from './minesweeper';

const Container = styled('div', () => ({
  position: 'absolute',
  left: '50vw',
  top: '50vh',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: '4px',
  padding: '8px',
}));

export default class GameWrapper extends Component {
  render() {
    return (
      <Container>
        <Menu />
        <Minesweeper
          height={this.props.height}
          width={this.props.width}
          bombs={this.props.bombs}
          onWin={this.props.onWin}
          onLoose={this.props.onLoose}
        />
      </Container>
    );
  }
}
