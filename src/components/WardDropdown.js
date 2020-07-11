import React from "react";
import PropTypes from "prop-types";
import SelectAll from "./SelectAll";
import ReactGA from 'react-ga';

import { WARD_OPTS } from "../constants";

const WardDropdown = ({ onSelect, selected }) => {

  const handleChange = (selectedOptions) => {
    ReactGA.event({
      category: 'Form Fields',
      action: 'Filter artwork',
      label: 'By ward',
    })
    onSelect(selectedOptions);
  };

  return (
    <SelectAll
      allowSelectAll = {true}
      closeMenuOnSelect={false}
      isMulti = {true}
      value={selected}
      onChange = {handleChange}
      options = {WARD_OPTS}
      className={"drp"}
    />
  );
};

WardDropdown.propTypes = {
  onSelect: PropTypes.func,
  selected: PropTypes.array,
};

export default WardDropdown;
