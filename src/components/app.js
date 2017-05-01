import React, { Component } from 'react';

import LevelPicker from './levelPicker';
import Minesweeper from './minesweeper';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      start: false,
      height: 0,
      width: 0,
      bombs: 0,
    };
  }
  render() {
    console.log(this.state.height, this.state.width, this.state.bombs);
    return (
      <div>
        {this.state.start
          ? <Minesweeper
              height={this.state.height}
              width={this.state.width}
              bombs={this.state.bombs}
            />
          : <LevelPicker
              start={(width, height, bombs) =>
                this.setState(() => ({
                  start: true,
                  height,
                  width,
                  bombs,
                }))}
            />}
      </div>
    );
  }
}

export default App;
