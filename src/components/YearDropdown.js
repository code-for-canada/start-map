import React from "react";
import PropTypes from "prop-types";
import SelectAll from "./SelectAll";
import ReactGA from 'react-ga';

import { YEAR_OPTS } from "../constants";

const YearDropdown = ({ onSelect, selected }) => {

  const handleChange = (selectedOptions) => {
    ReactGA.event({
      category: 'Form Fields',
      action: 'Filter artwork',
      label: 'By year',
    })
    onSelect(selectedOptions);
  };

  return (
    <SelectAll
      allowSelectAll={true}
      closeMenuOnSelect={false}
      isMulti={true}
      value={selected}
      onChange={handleChange}
      options = {YEAR_OPTS}
      className={"drp"}
      id={'year'}
    />
  );
}

YearDropdown.propTypes = {
  onSelect: PropTypes.func,
  selected: PropTypes.array,
};

export default YearDropdown;
