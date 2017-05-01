import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import LevelPicker from './levelPicker';
import Minesweeper from './minesweeper';

import './app.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      start: false,
      height: 0,
      width: 0,
      bombs: 0,
    };

    this.onWin = this.onWin.bind(this);
    this.onLoose = this.onLoose.bind(this);
  }
  onWin() {
    this.setState(() => ({ start: false }));
    console.log('Gagné');
  }
  onLoose() {
    this.setState(() => ({ start: false }));
    console.log('Perdu');
  }
  render() {
    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName="game-menu"
          transitionEnterTimeout={750}
          transitionLeaveTimeout={500}
        >
          {this.state.start
            ? <Minesweeper
                height={this.state.height}
                width={this.state.width}
                bombs={this.state.bombs}
                onWin={this.onWin}
                onLoose={this.onLoose}
                key="minesweeper"
              />
            : <LevelPicker
                start={(width, height, bombs) =>
                  this.setState(() => ({
                    start: true,
                    height,
                    width,
                    bombs,
                  }))}
                key="levelPicker"
              />}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
export default App;
