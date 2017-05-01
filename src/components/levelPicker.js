import React, { Component } from 'react';
import { styled } from 'styletron-react';

import Level from './level';

const Container = styled('div', () => ({
  position: 'relative',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  top: '50vh',
  left: '50vw',
  maxWidth: '400px',
  transform: 'translate(calc(-50% - 8px), -50%)',
  borderRadius: '4px',
  padding: '8px',
}));

const Title = styled('h1', () => ({
  width: '100%',
  textAlign: 'center',
  fontWeight: 'bold',
  marginTop: '8px',
  marginBottom: '16px',
}));

class LevelPicker extends Component {
  render() {
    return (
      <Container>
        <Title>Choose a level</Title>
        <div>
          <Level level="easy" />
          <Level level="medium" />
          <Level level="hard" />
          <Level level="custom" />
        </div>
      </Container>
    );
  }
}

export default LevelPicker;
