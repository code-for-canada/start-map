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
      color: state.isDisabled ? '#ccc' : state.data.color,
      cursor: state.isDisabled ? 'not-allowed' : 'default',
    }),

    multiValueLabel: (base, state) => ({
      ...base,
      color: state.data.color,
    }),

    multiValueRemove: (base, state) => ({
      ...base,
      color: state.data.color,
      ':hover': {
        backgroundColor: state.data.color,
        color: 'white',
      },
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
