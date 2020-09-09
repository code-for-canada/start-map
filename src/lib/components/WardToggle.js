import React from "react";
import PropTypes from "prop-types";
import Switch from './Switch';

const WardToggle = ({ showWardLayer, onClick }) => {
  return (
    <Switch
      handleChange={ onClick }
      value={ showWardLayer }
      trueLabel={ "ON" }
      falseLabel={ "OFF" }
      aria-labelledby="ward-layer-label"
    />
  );
}

WardToggle.propTypes = {
  showWardLayer: PropTypes.bool,
  onClick: PropTypes.func,
}

export default WardToggle;
