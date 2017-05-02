import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import SVG from 'svg.js';
import PropTypes from 'prop-types';

const polarToCartesian = (cx, cy, r, angleDeg) => {
  const angleRad = (angleDeg - 90) * Math.PI / 180.0;

  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
};

const describeArc = (x, y, r, startAngle, endAngle) => {
  const start = polarToCartesian(x, y, r, endAngle);
  const end = polarToCartesian(x, y, r, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
};

const updateProgress = (arc, angleDeg, size, margin) => {
  const realAngleDeg = (angleDeg % 360 + 360) % 360;
  const realAngleRad = realAngleDeg * Math.PI / 180.0;
  let cx;
  let cy;
  if (realAngleDeg <= 90) {
    cx = size * 3 / 4 + Math.sin(realAngleRad) * size / 2 / 2;
    cy = size / 4 + (1 - Math.cos(realAngleRad)) * size / 2 / 2;
  } else if (realAngleDeg <= 180) {
    cx = size;
    cy = size / 2 + Math.sin(realAngleRad - Math.PI / 2) * size / 2 / 2;
  } else if (realAngleDeg <= 270) {
    cx = size - Math.sin(realAngleRad - Math.PI) * size / 2 / 2;
    cy = size * 3 / 4;
  } else {
    cx = size * 3 / 4;
    cy = size * 3 / 4;
  }
  return arc.attr({
    d: describeArc(
      size / 2 + margin,
      size / 2 + margin,
      size / 2,
      0,
      realAngleDeg
    ),
    cx,
    cy,
  });
};

const createProgress = (draw, size, margin, angleDeg, color, width) => {
  const realAngleDeg = (angleDeg % 360 + 360) % 360;
  return updateProgress(
    draw
      .path(
        describeArc(
          size / 2 + margin,
          size / 2 + margin,
          size / 2,
          0,
          realAngleDeg
        )
      )
      .fill('none')
      .stroke({ color, width }),
    realAngleDeg,
    size,
    margin
  );
};

class Progress extends Component {
  componentDidMount() {
    const svg = findDOMNode(this.refs.svg);
    const draw = SVG(svg).size(
      this.props.size + 2 * this.props.margin,
      this.props.size + 2 * this.props.margin
    );
    this.circle = draw
      .circle(this.props.size)
      .fill('none')
      .stroke({ color: '#a04c31', width: 5 })
      .move(this.props.margin, this.props.margin);
    this.text = draw
      .text('00')
      .fill('#a04c31')
      .center(
        this.props.size / 2 + this.props.margin,
        this.props.size / 2 + this.props.margin
      );
    this.arc = createProgress(
      draw,
      this.props.size,
      this.props.margin,
      0,
      this.props.color,
      5
    );
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.time !== this.props.time) {
      updateProgress(
        this.arc,
        nextProps.time * 6,
        this.props.size,
        this.props.margin
      );
      this.text.text(`${nextProps.time >= 10 ? '' : 0}${nextProps.time}`);
    }
  }
  // eslint-disable-next-line
  render() {
    return <div ref="svg" style={{ width: '25%' }} />;
  }
}

Progress.propTypes = {
  size: PropTypes.number.isRequired,
  margin: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
};

export default Progress;
