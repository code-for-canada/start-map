import React, { Component } from "react";
import PropTypes from "prop-types";
import SelectAll from "./SelectAll";

import * as constants from "../constants";

class WardDropdown extends Component {
  static propTypes = {
    onSelect: PropTypes.func,
    selected: PropTypes.array,
  };

  handleChange = (selectedOptions) => {
    this.props.onSelect(selectedOptions);
  };

  render() {
    return (
      <SelectAll
        allowSelectAll = {true}
        closeMenuOnSelect={false}
        isMulti = {true}
        value={this.props.selected}
        onChange = {this.handleChange}
        options = {constants.WARD_OPTS}
        className={"drp"}
      />
    );
  }
};

export default WardDropdown;
