import React, { Component } from "react";
import PropTypes from "prop-types";
import SelectAll from "./SelectAll";

import * as constants from "../constants";

class Programs extends Component {
  static propTypes = {
    prgrmFilter: PropTypes.func,
    selected: PropTypes.array,
  };

  onChange = inputValue => {
    this.props.prgrmFilter(inputValue);
  };

  render() {
    const colourStyles = {
      control: styles => ({ ...styles, backgroundColor: 'white' }),
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
          ...styles,

          color: isDisabled
          ? '#ccc'
          : data.color,
          cursor: isDisabled ? 'not-allowed' : 'default',
        };
      },

      multiValueLabel: (styles, { data }) => ({
        ...styles,
        color: data.color,
      }),
      multiValueRemove: (styles, { data }) => ({
        ...styles,
        color: data.color,
        ':hover': {
          backgroundColor: data.color,
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

export default Programs;
