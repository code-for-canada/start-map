import React, { Component } from "react";
import PropTypes from "prop-types";

class WardToggle extends Component {
  static propTypes = {
    showWardLayer: PropTypes.bool,
    onClick: PropTypes.func,
  }

  handleClick = () => {
    this.props.onClick();
  }

  render() {
    const { showWardLayer } = this.props
    return (
      <button onClick={this.handleClick} className="btn btn-light">
        {showWardLayer ? 'ON' : 'OFF'}
      </button>
    );
  }
}

export default WardToggle;
