import React from 'react';
import { styled } from 'styletron-react';
import PropTypes from 'prop-types';

import Level from './level';

const Container = styled('div', () => ({
  position: 'absolute',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  top: '50vh',
  left: '50vw',
  maxWidth: '400px',
  width: '100%',
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

const LevelPicker = props => (
  <Container>
    <Title>Choose a level</Title>
    <div>
      <Level level="easy" start={props.start} />
      <Level level="medium" start={props.start} />
      <Level level="hard" start={props.start} />
      <Level level="custom" start={props.start} />
    </div>
  </Container>
);

LevelPicker.propTypes = {
  start: PropTypes.func.isRequired,
};

export default LevelPicker;
