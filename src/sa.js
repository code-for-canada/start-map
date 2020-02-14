import React from "react";
import { default as ReactSelect } from 'react-select';
import PropTypes from "prop-types";



// specify props.allowSelectAll = true to enable!
const SelectAll = props => {
  if (props.allowSelectAll) {
    if (props.value  && props.value.length === props.options.length) {
      return (
        <ReactSelect
        {...props}
        value={[props.allOption]}
        onChange={selected => {
          let sel = selected.slice(1)
          if (selected.length === 0){
            return props.onChange(props.options)
          } else {
            return props.onChange(selected.slice(1))
          }
        }}

        />
      );
    }
    else if (props.value && props.value[0].label === "Select All") {
      return (
        <ReactSelect
        {...props}
        options={[props.allOption, ...props.options]}
        value={[props.allOption]}
        onChange={selected => props.onChange(selected.slice(1))}
        />
      );
    }
    else {

      return (
        <ReactSelect
        {...props}
        options={[props.allOption, ...props.options]}
        onChange={selected => {
          if (
            selected.length > 0 &&
            selected[selected.length - 1].value === props.allOption.value
          ) {
            return props.onChange(props.options);
          } else if (selected.length === 0) {
            return props.onChange(props.options);
          } else {
            return props.onChange(selected);
          }

        }}

        />

      );
    }
  }
};




SelectAll.propTypes = {
  options: PropTypes.array,
  value: PropTypes.any,
  onChange: PropTypes.func,
  setValue: PropTypes.func,
  allowSelectAll: PropTypes.bool,
  allOption: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  })
};

SelectAll.defaultProps = {
  allOption: {
    label: "Select all",
    value: "*"
  }
};

export default SelectAll;
