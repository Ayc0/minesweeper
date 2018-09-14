import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import LevelPicker from './levelPicker';
import GameWrapper from './gameWrapper';

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

    this.onStop = this.onStop.bind(this);
  }
  onStop() {
    this.setState(() => ({ start: false }));
  }
  render() {
    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName="game-menu"
          transitionEnterTimeout={750}
          transitionLeaveTimeout={500}
        >
          {this.state.start ? (
            <GameWrapper
              height={this.state.height}
              width={this.state.width}
              bombs={this.state.bombs}
              onStop={this.onStop}
              key="gameWrapper"
            />
          ) : (
            <LevelPicker
              start={(width, height, bombs) =>
                this.setState(() => ({
                  start: true,
                  height,
                  width,
                  bombs,
                }))
              }
              key="levelPicker"
            />
          )}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
export default App;
