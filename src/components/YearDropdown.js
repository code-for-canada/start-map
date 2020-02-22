import React, { Component } from "react";
import PropTypes from "prop-types";
import SelectAll from "./SelectAll";

import * as constants from "../constants";

class YearDropdown extends Component {
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
        allowSelectAll={true}
        closeMenuOnSelect={false}
        isMulti={true}
        value={this.props.selected}
        onChange={this.handleChange}
        options = {constants.YEAR_OPTS}
        className={"drp"}
      />
    );
  }
}

export default YearDropdown;
