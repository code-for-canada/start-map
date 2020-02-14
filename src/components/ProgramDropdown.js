import React, { Component } from "react";
import PropTypes from "prop-types";
import SelectAll from "./SelectAll";

import * as constants from "../constants";

class ProgramDropdown extends Component {
  static propTypes = {
    prgrmFilter: PropTypes.func,
    selected: PropTypes.array,
  };

  onChange = inputValue => {
    this.props.prgrmFilter(inputValue);
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
        closeMenuOnSelect={false}
        isMulti={true}
        defaultValue={constants.PROGRAM_OPTS}
        value={this.props.selected}
        onChange={this.onChange}
        allowSelectAll={true}
        options = {constants.PROGRAM_OPTS}
        className={"drp"}
        styles={colourStyles}
      />
    );
  }
}

export default ProgramDropdown;
