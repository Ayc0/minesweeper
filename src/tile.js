import React from 'react';
import { styled } from 'styletron-react';

import PropTypes from 'prop-types';

const size = '20px';

const StyledTile = styled('div', () => ({
  height: size,
  width: size,
  backgroundColor: 'grey',
  border: '1px solid black',
  color: 'black',
  padding: 0,
  margin: 0,
}));

const Tile = props => (
  <StyledTile onClick={() => props.onClick(props.x, props.y)}>
    {props.children || null}
  </StyledTile>
);

Tile.propTypes = {
  onClick: PropTypes.func.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default Tile;
