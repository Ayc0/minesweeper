import React, { Component } from 'react';
import { styled } from 'styletron-react';
import Fa from 'react-fontawesome';
import Color from 'color';

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

const Blur = styled('div', () => ({
  position: 'fixed',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '200vw',
  zIndex: 1000,
  backgroundColor: 'rgba(50, 50, 50, 0.5)',
}));

const Popup = styled('div', () => ({
  position: 'fixed',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '4px',
  backgroundColor: 'white',
  zIndex: 1200,
  whiteSpace: 'pre-wrap',
  width: '15em',
  padding: '1em',
}));

const color = Color('#5e7b3e').lighten(0.2);

const Button = styled('button', props => ({
  borderRadius: '5px',
  backgroundColor: props.hollow ? 'white' : color.hex(),
  border: `1px solid ${color.hex()}`,
  color: props.hollow ? color.hex() : 'white',
  ':hover': {
    backgroundColor: props.hollow
      ? Color('#fff').darken(0.1).hex()
      : color.darken(0.2).hex(),
    borderColor: color.darken(0.2).hex(),
    color: props.hollow
      ? color.darken(0.2).hex()
      : Color('#fff').darken(0.1).hex(),
  },
  outline: 'none',
  width: '48%',
  fontFamily: 'Lato',
  fontSize: '16px',
  padding: '0.3em',
  margin: '2px',
  float: props.right ? 'right' : '',
}));

export default class GameWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = { showPopup: false, time: Infinity, stop: false };

    this.onStop = this.onStop.bind(this);
    this.stop = this.stop.bind(this);
    this.win = this.win.bind(this);
    this.loose = this.loose.bind(this);
    this.getEndTime = this.getEndTime.bind(this);
  }
  onStop() {
    this.setState(() => ({ showPopup: true }));
  }
  stop() {
    this.setState(() => ({ type: 'stop' }));
    this.onStop();
  }
  win() {
    this.setState(() => ({ type: 'win', stop: true }));
    this.onStop();
  }
  loose() {
    this.setState(() => ({ type: 'loose', stop: true }));
    this.onStop();
  }
  getEndTime(time) {
    this.setState(() => ({ time }));
  }
  render() {
    const texts = {
      loose: (
        <div>
          <h1>Lost <Fa name="frown-o" /> </h1>
          <p>Wanna retry?</p>
          <Button type="button" onClick={this.props.onStop} right>OK</Button>
        </div>
      ),
      win: (
        <div>
          <h1>Won <Fa name="smile-o" /> </h1>
          <p>
            Well done, you have won after{' '}
            {Math.floor(this.state.time / 60)}min{' '}
            {this.state.time % 60}s.
          </p>
          <p>Wanna beat your score?</p>
          <Button type="button" onClick={this.props.onStop} right>OK</Button>
        </div>
      ),
      stop: (
        <div>
          <h1>Quit <Fa name="meh-o" /> </h1>
          <p>Why leaving now?</p>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Button type="button" hollow onClick={this.props.onStop}>
              Quit
            </Button>
            <Button
              type="button"
              onClick={() => this.setState(() => ({ showPopup: false }))}
            >
              Stay
            </Button>
          </div>
        </div>
      ),
    };
    return (
      <Container>
        <Menu
          onStop={this.stop}
          stop={this.state.stop}
          getEndTime={this.getEndTime}
        />
        <Minesweeper
          height={this.props.height}
          width={this.props.width}
          bombs={this.props.bombs}
          onWin={this.win}
          onLoose={this.loose}
        />
        {this.state.showPopup ? <Blur /> : null}
        {this.state.showPopup
          ? <Popup>
              {texts[this.state.type]}
            </Popup>
          : null}
      </Container>
    );
  }
}
