import React, { Component } from "react";
import PropTypes from "prop-types";
import { default as ReactSelect } from 'react-select';
import ReactGA from 'react-ga';
import filter from "lodash/filter";

import * as constants from "../constants";

class SortDropdown extends Component {
  static propTypes = {
    onSelect: PropTypes.func,
    sortType: PropTypes.string,
  }

  handleChange = inputValue => {
    ReactGA.event({
      category: 'Form Fields',
      action: 'Sort artwork',
      label: `Sort by ${inputValue.label}`,
    })
    this.props.onSelect(inputValue.value);
  };

  render() {
    const { sortType } = this.props;
    let selectedOption = filter(constants.SORT_OPTS, {value: sortType})
    return(
      <ReactSelect
        closeMenuOnSelect={false}
        isMulti={false}
        clearable={false}
        value={selectedOption}
        onChange={this.handleChange}
        options = {constants.SORT_OPTS}
        //defaultValue={constants.SORT_OPTS[0]}
        className={"sortDrp"}
      />
    )
  }
}

export default SortDropdown;
