import React, { Component } from "react";
import PropTypes from "prop-types";

class BackToListViewButton extends Component {
  static propTypes = {
    click: PropTypes.func,
  }

  handleClick = (event) => {
    this.props.click // eslint-disable-line
  }

  render() {
    return (
      <button
        aria-label="Back"
        id="back"
        onClick={this.handleClick}
        type="button"
        className="btn btn-light"
      >
        ← Back
      </button>
    );
  }
}

export default BackToListViewButton;
