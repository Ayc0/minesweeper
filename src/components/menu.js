import React, { Component } from 'react';
import { styled } from 'styletron-react';
import FA from 'react-fontawesome';
import PropTypes from 'prop-types';

import Progress from './progress';

const Wrapper = styled('div', () => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
}));

const Fa = styled(FA, () => ({
  cursor: 'pointer',
  fontSize: '26px',
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  ':first-child': {
    alignItems: 'flex-start',
  },
  color: '#a04c31',
  width: '50%',
}));

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = { i: 0 };

    this.detectEscape = this.detectEscape.bind(this);
  }
  componentDidMount() {
    this.interval = setInterval(() => this.setState(prevState => ({ i: prevState.i + 1 })), 1000);
    window.addEventListener('keyup', this.detectEscape);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.stop !== this.props.stop && nextProps.stop) {
      this.props.getEndTime(this.state.i);
      clearInterval(this.interval);
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
    window.removeEventListener('keyup', this.detectEscape);
  }

  detectEscape(event) {
    if (event.keyCode === 27) {
      this.props.onStop();
    }
  }
  render() {
    return (
      <Wrapper>
        <Fa name="times" onClick={this.props.onStop} />
        <Progress size={38} margin={3} time={Math.floor(this.state.i / 60)} color="#d5c366" />
        <Progress size={38} margin={3} time={this.state.i % 60} color="#cbcb85" />
      </Wrapper>
    );
  }
}

Menu.propTypes = {
  stop: PropTypes.bool.isRequired,
  getEndTime: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
};

export default Menu;
