import React from "react";
import PropTypes from "prop-types";

const WardToggle = ({ showWardLayer, onClick }) => {
  return (
    <button onClick={onClick} className="btn btn-light">
      {showWardLayer ? 'ON' : 'OFF'}
    </button>
  );
}

WardToggle.propTypes = {
  showWardLayer: PropTypes.bool,
  onClick: PropTypes.func,
}

export default WardToggle;
