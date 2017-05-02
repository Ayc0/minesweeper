import React from 'react';
import { styled } from 'styletron-react';
import Fa from 'react-fontawesome';
import PropTypes from 'prop-types';

const size = '20px';
const checkClickable = value => value === null || value === -2 || value === -3;

const StyledTile = styled('div', props => ({
  height: size,
  width: size,
  // backgroundColor: checkClickable(props.value) ? '#ffe4af' : '#fff2d8',
  backgroundColor: checkClickable(props.value) ? '#e2d866' : '#e8e1a7', // e6de7d
  border: '1px solid #bcaa14',
  color: checkClickable(props.value) ? '#a04c31' : '#72270e',
  fontWeight: 'bold',
  padding: 0,
  margin: 0,
  textAlign: 'center',
}));

StyledTile.propTypes = {
  value: PropTypes.number,
};

StyledTile.defaultProps = {
  value: null,
};

const Tile = props => (
  <StyledTile
    onClick={() => props.onClick(props.x, props.y)}
    onContextMenu={e => props.onContextMenu(e, props.x, props.y)}
    onDoubleClick={() => props.onDoubleClick(props.x, props.y)}
    value={props.value}
  >
    {props.value > 0 ? props.value : null}
    {props.value === -1 ? <Fa name="bomb" /> : null}
    {props.value === -2 ? <Fa name="flag" /> : null}
    {props.value === -3 ? <Fa name="question" /> : null}
  </StyledTile>
);

Tile.propTypes = {
  onClick: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  value: PropTypes.number,
};

Tile.defaultProps = {
  value: null,
};

export default Tile;
