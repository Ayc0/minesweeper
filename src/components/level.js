import React, { Component } from 'react';
import { styled } from 'styletron-react';
import Fa from 'react-fontawesome';
import Color from 'color';

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

const Container = styled('div', props => ({
  backgroundColor: props.color,
  border: '0.5px solid #1a2125',
  borderBottom: 0,
  ':last-child': {
    borderBottom: '0.5px solid #1a2125',
    borderRadius: '0 0 5px 5px',
  },
  ':first-child': {
    borderRadius: '5px 5px 0 0',
  },
  display: 'flex',
  flexDirection: 'row',
  paddingLeft: '8px',
  paddingRight: '8px',
}));

const Difficulty = styled('h2', () => ({
  alignSelf: 'flex-start',
  width: '32%',
}));

const Play = styled('h2', () => ({
  alignSelf: 'flex-end',
  width: '20%',
  marginRight: '10%',
  marginBottom: '8px',
  cursor: 'pointer',
  ':hover': {
    color: Color('#1a2125').lighten(0.6).hex(),
  },
  ':active': {
    color: Color('#1a2125').lighten(0.9).hex(),
  },
}));

const Items = styled('div', () => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
}));

const Item = styled('div', () => ({
  position: 'relative',
  border: '0.5px solid #1a2125',
  borderRadius: '1em',
  backgroundColor: 'rgba(255, 255, 255, 0.50)',
  margin: '5px',
  marginBottom: 0,
  ':last-child': {
    marginBottom: '5px',
  },
  padding: '5px',
  display: 'flex',
  flexDirection: 'row',
}));

const Icon = styled(Fa, () => ({
  width: '16px',
  marginLeft: '6px',
  marginRight: '23%',
  textAlign: 'center',
}));

const Arrows = styled('div', () => ({
  position: 'absolute',
  top: 0,
  right: '10px',
  display: 'flex',
  flexDirection: 'column',
}));

const Caret = styled(Fa, () => ({
  cursor: 'pointer',
  height: '12px',
  ':hover': {
    color: Color('#1a2125').lighten(0.6).hex(),
  },
  ':active': {
    color: Color('#1a2125').lighten(0.9).hex(),
  },
}));

const PickArrows = props => (
  <Arrows>
    <Caret name="caret-up" onClick={props.onPlus} />
    <Caret name="caret-down" onClick={props.onMinus} />
  </Arrows>
);

export default class Level extends Component {
  constructor(props) {
    super(props);

    this.state = { width: 0, height: 0, bombs: 0 };
    this.backgroundColor = '';

    this.onPlusWidth = this.onPlusWidth.bind(this);
    this.onMinusWidth = this.onMinusWidth.bind(this);
    this.onPlusHeight = this.onPlusHeight.bind(this);
    this.onMinusHeight = this.onMinusHeight.bind(this);
    this.onPlusBombs = this.onPlusBombs.bind(this);
    this.onMinusBombs = this.onMinusBombs.bind(this);
  }
  componentWillMount() {
    switch (this.props.level) {
      case 'easy':
        this.backgroundColor = '#0cb64b';
        this.setState(() => ({ width: 9, height: 9, bombs: 10 }));
        break;
      case 'medium':
        this.backgroundColor = '#2e84cc';
        this.setState(() => ({ width: 16, height: 16, bombs: 40 }));
        break;
      case 'hard':
        this.backgroundColor = '#9b4fe3';
        this.setState(() => ({ width: 16, height: 30, bombs: 99 }));
        break;
      case 'custom':
        this.backgroundColor = '#e39f27';
        this.setState(() => ({ width: 16, height: 16, bombs: 1 }));
        break;
      default:
        this.backgroundColor = '';
        break;
    }
  }
  onPlusWidth() {
    this.setState(prevState => ({ width: Math.min(prevState.width + 1, 24) }));
  }
  onMinusWidth() {
    this.setState(prevState => ({ width: Math.max(prevState.width - 1, 2) }));
  }
  onPlusHeight() {
    this.setState(prevState => ({
      height: Math.min(prevState.height + 1, 30),
    }));
  }
  onMinusHeight() {
    this.setState(prevState => ({ height: Math.max(prevState.height - 1, 2) }));
  }
  onPlusBombs() {
    this.setState(prevState => ({
      bombs: Math.min(
        prevState.bombs + 1,
        (prevState.width - 1) * (prevState.height - 1)
      ),
    }));
  }
  onMinusBombs() {
    this.setState(prevState => ({ bombs: Math.max(prevState.bombs - 1, 1) }));
  }
  render() {
    return (
      <Container color={this.backgroundColor}>
        <Difficulty>{capitalize(this.props.level)}</Difficulty>
        <Play
          onClick={() =>
            this.props.start(
              this.state.width,
              this.state.height,
              this.state.bombs
            )}
        >
          Play <Fa name="play" style={{ fontSize: '22px' }} />
        </Play>
        <Items>
          <Item>
            <Icon name="arrows-h" />
            {this.state.width}
            {this.props.level === 'custom'
              ? <PickArrows
                  onPlus={this.onPlusWidth}
                  onMinus={this.onMinusWidth}
                />
              : null}
          </Item>
          <Item>
            <Icon name="arrows-v" />
            {this.state.height}
            {this.props.level === 'custom'
              ? <PickArrows
                  onPlus={this.onPlusHeight}
                  onMinus={this.onMinusHeight}
                />
              : null}
          </Item>
          <Item>
            <Icon name="bomb" />
            {this.state.bombs}
            {this.props.level === 'custom'
              ? <PickArrows
                  onPlus={this.onPlusBombs}
                  onMinus={this.onMinusBombs}
                />
              : null}
          </Item>
        </Items>
      </Container>
    );
  }
}
