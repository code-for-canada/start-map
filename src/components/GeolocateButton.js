import React from "react";
import PropTypes from "prop-types";
import locator from '../assets/img/crosshair.svg';
import ReactGA from 'react-ga';


const GeolocateButton = ({ onClick }) => {
  const handleClick = () => {
    ReactGA.event({
      category: 'Map',
      action: 'Click geolocation button',
    })
    onClick()
  }

  return (
    <button aria-label="Center map on your location" id="geolocate-btn" onClick={handleClick} type="button" className="">
      <img alt="Crosshairs graphic" aria-label="Geolocate" id="crosshairs" src={locator} />
    </button>
  );
}

GeolocateButton.propTypes = {
  onClick: PropTypes.func
}

export default GeolocateButton