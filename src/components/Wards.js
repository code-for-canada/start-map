import React, { Component } from "react";
import PropTypes from "prop-types";
import SelectAll from "./SelectAll";

import * as constants from "../constants";

class Wards extends Component {
  static propTypes = {
    wrdsFilter: PropTypes.func,
    selected: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedOption: this.props.selected
    };
  }

  handleChange = (selectedOption) => {
    this.props.wrdsFilter(selectedOption);
  };

  render() {
    return (
      <SelectAll
        closeMenuOnSelect={false}
        isMulti = {true}
        allowSelectAll = {true}
        onChange = {this.handleChange}
        value={this.props.selected}
        defaultValue={this.state.selectedOption}
        options = {constants.WARD_OPTS}
        className={"drp"}
      />
    );
  }
};

export default Wards;
