import React from "react";
import ReactSelect from 'react-select';
import PropTypes from "prop-types";

/**
 * Select component extended with a "Select all" option.
 *
 * @see https://medium.com/@alex_escalante/react-select-alloptionoptions-with-a-single-click-1ebf5a33fe31
 * @see https://github.com/JedWatson/react-select/issues/892
 */
const SelectAll = props => {
  const isNoneSelected = (selected) => {
    return (
      selected === null ||
      selected.length === 0
    )
  }

  const areAllSelected = (props) => {
    return (
      props.value !== null &&
      props.value.length === props.options.length
    );
  }

  if (props.allowSelectAll) {
    if (areAllSelected(props)) {
      return (
        <ReactSelect
          {...props}
          value={[props.allOption]}
          onChange={
            selected => {
              if (isNoneSelected(selected)) {
                return props.onChange(props.options);
              } else {
                return props.onChange(selected.slice(1));
              }
            }
          }
        />
      );
    } else {
      return (
        <ReactSelect
          {...props}
          options={[props.allOption, ...props.options]}
          onChange={
            selected => {
              if (isNoneSelected(selected) || selected.includes(props.allOption)) {
                return props.onChange(props.options)
              } else {
                return props.onChange(selected)
              }
            }
          }
        />
      );
    }
  }

  return <ReactSelect {...props} />;
};

SelectAll.propTypes = {
  /** Enable "select all" option. */
  allowSelectAll: PropTypes.bool,
  /** How the "select all" option is displayed. */
  allOption: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  }),

  /**
   * Remaining props inherit definitions from the ReactSelect component.
   *
   * @see https://react-select.com/props
   * @see https://github.com/JedWatson/react-select/blob/v2.4.4/src/Select.js#L78
   */
  /** Array of options that populate the select menu */
  options: PropTypes.array,
  /** The value of the select; reflected by the selected option */
  value: PropTypes.any,
  /** Handle change events on the select */
  onChange: PropTypes.func,
  setValue: PropTypes.func,
};

SelectAll.defaultProps = {
  allOption: {
    label: "Select all",
    value: "*"
  },
};

export default SelectAll;
