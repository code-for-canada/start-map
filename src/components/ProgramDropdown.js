import React, { Component } from "react";
import PropTypes from "prop-types";
import SelectAll from "./SelectAll";
import ReactGA from 'react-ga';

import * as constants from "../constants";

class ProgramDropdown extends Component {
  static propTypes = {
    onSelect: PropTypes.func,
    selected: PropTypes.array,
  };

  handleChange = (selectedOptions) => {
    ReactGA.event({
      category: 'Form Fields',
      action: 'Filter artwork',
      label: 'By program',
    })
    this.props.onSelect(selectedOptions);
  };

  render() {
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
        value={this.props.selected}
        onChange={this.handleChange}
        options = {constants.PROGRAM_OPTS}
        className={"drp"}
        styles={colourStyles}
      />
    );
  }
}

export default ProgramDropdown;
