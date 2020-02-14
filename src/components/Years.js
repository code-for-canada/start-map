import React, { Component } from "react";
import PropTypes from "prop-types";
import SelectAll from "./SelectAll";

import * as constants from "../constants";

class Years extends Component {
  static propTypes = {
    yrsFilter: PropTypes.func,
    selected: PropTypes.array,
  };

  onChange = inputValue => {
    this.props.yrsFilter(inputValue);
  };

  render() {
    return (
      <SelectAll
        closeMenuOnSelect={false}
        isMulti={true}
        defaultValue={constants.YEAR_OPTS}
        value={this.props.selected}
        onChange={this.onChange}
        allowSelectAll={true}
        options = {constants.YEAR_OPTS}
        className={"drp"}
      />
    );
  }
}

export default Years;
