// Not use in the project
// Was planned to be a rules page

import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import SVG from 'svg.js';

export default class App extends Component {
  componentDidMount() {
    const svg = findDOMNode(this.refs.svg);
    const draw = SVG(svg);
    this.line1 = draw.line(0, 100, 100, 0).move(25, 25);
    this.line1
      .stroke({ color: '#f06', width: 10, linecap: 'round' })
      .move(25, 25);
    this.line2 = draw.line(0, 0, 100, 100).move(25, 25);
    this.line2.stroke({ color: '#f06', width: 10, linecap: 'round' });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== this.props.active) {
      if (nextProps.active) {
        this.line1.animate(450).attr({ x1: 125, y1: 25, x2: 25, y2: 75 });
        this.line2.animate(450).attr({ x1: 125, y1: 125, x2: 25, y2: 75 });
      }
    }
  }
  // eslint-disable-next-line
  render() {
    return <div ref="svg" />;
  }
}
