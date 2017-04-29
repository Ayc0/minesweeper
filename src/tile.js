import React from 'react';
import { styled } from 'styletron-react';

import PropTypes from 'prop-types';

const size = '20px';
const checkClickable = value => value === null || value === -2 || value === -3;

const StyledTile = styled('div', props => ({
  height: size,
  width: size,
  backgroundColor: checkClickable(props.value) ? 'grey' : 'white',
  border: '1px solid black',
  color: 'black',
  padding: 0,
  margin: 0,
}));

const Tile = props => (
  <StyledTile
    onClick={() => props.onClick(props.x, props.y)}
    onContextMenu={e => props.onContextMenu(e, props.x, props.y)}
    value={props.value}
  >
    {props.value > 0 ? props.value : null}
    {props.value === -1 ? 'B' : null}
    {props.value === -2 ? 'F' : null}
    {props.value === -3 ? '?' : null}
  </StyledTile>
);

Tile.propTypes = {
  onClick: PropTypes.func.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  value: PropTypes.number,
};

Tile.defaultProps = {
  value: null,
};

export default Tile;
