import React, { Component } from "react";
import PropTypes from "prop-types";
import { default as ReactSelect } from 'react-select';

import * as constants from "../constants";

class SortDropdown extends Component {
  static propTypes = {
    setSortMethod: PropTypes.func,
  }

  handleChange = inputValue => {
    this.props.setSortMethod(inputValue.value);
  };

  render() {
    return(
      <ReactSelect
        closeMenuOnSelect={true}
        isMulti={false}
        clearable={false}
        onChange={this.handleChange}
        options = {constants.SORT_OPTS}
        defaultValue={constants.SORT_OPTS[0]}
        className={"sortDrp"}
      />
    )
  }
}

export default SortDropdown;
