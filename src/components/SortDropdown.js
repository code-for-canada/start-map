import React from "react";
import PropTypes from "prop-types";
import ReactSelect from 'react-select';
import ReactGA from 'react-ga';
import filter from "lodash/filter";

import { SORT_OPTS } from "../constants";

const SortDropdown = ({ onSelect, sortType }) => {
  const handleChange = inputValue => {
    ReactGA.event({
      category: 'Form Fields',
      action: 'Sort artwork',
      label: `Sort by ${inputValue.label}`,
    })
    onSelect(inputValue.value);
  };

  let selectedOption = filter(SORT_OPTS, {value: sortType})

  return(
    <ReactSelect
      closeMenuOnSelect={false}
      isMulti={false}
      clearable={false}
      value={selectedOption}
      onChange={handleChange}
      options = {SORT_OPTS}
      className={"drp"}
      id={'sort'}
    />
  )
}

SortDropdown.propTypes = {
  onSelect: PropTypes.func,
  sortType: PropTypes.string,
}

export default SortDropdown;
