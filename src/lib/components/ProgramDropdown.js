import React from "react";
import PropTypes from "prop-types";
import SelectAll from "./SelectAll";
import ReactGA from 'react-ga';

import { PROGRAM_OPTS } from "../constants";

const ProgramDropdown = ({ onSelect, selected }) => {

  const handleChange = (selectedOptions) => {
    ReactGA.event({
      category: 'Form Fields',
      action: 'Filter artwork',
      label: 'By program',
    })
    onSelect(selectedOptions);
  };

  const colourStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: 'white',
    }),

    option: (base, state) => ({
      ...base,
      color: state.isDisabled ? '#ccc' : '#343a40',
      cursor: state.isDisabled ? 'not-allowed' : 'default',
    }),

    multiValueLabel: (base, state) => ({
      ...base,
      color: '#343a40',
    }),

    multiValueRemove: (base, state) => ({
      ...base,
      color: '#343a40'
    }),
  }

  return (
    <SelectAll
      allowSelectAll={true}
      closeMenuOnSelect={false}
      isMulti={true}
      value={selected}
      onChange={handleChange}
      options = {PROGRAM_OPTS}
      className={"drp"}
      styles={colourStyles}
      id="program"
    />
  );
}

ProgramDropdown.propTypes = {
  onSelect: PropTypes.func,
  selected: PropTypes.array,
};

export default ProgramDropdown;
