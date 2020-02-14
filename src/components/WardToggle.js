import React, { Component } from "react";
import PropTypes from "prop-types";

class WardToggle extends Component {
  static propTypes = {
    state: PropTypes.bool,
    click: PropTypes.func,
  }

  state = {
    isToggleOn: this.props.state,
  }

  handleClick = (event) => {
    this.props.click(this.state.isToggleOn);
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick} className="btn btn-light">
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

export default WardToggle;
