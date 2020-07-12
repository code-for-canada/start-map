import React from "react";
import PropTypes from "prop-types";
import locator from '../assets/img/locate.png';
import ReactGA from 'react-ga';

const BackToListViewButton = ({ onClick }) => {
  return (
    <div className="BackToListView" onClick={onClick}>
      <button
        aria-label="Back"
        id="back"
        type="button"
        className="btn btn-light"
      >
        ← Back
      </button>
    </div>
  )
}

const MobileListToggleButton = ({ onClick, isList }) => {
  return (
    <button onClick={onClick} className="btn btn-outline-dark btn-sm">
      {isList ? 'Map' : 'List'}
    </button>
  );
}

const MobileFilterViewButton = ({ onClick, isFiltered }) => {
  return (
    <div id="filter">
      { isFiltered ? <div id="filterBubble"></div> : null }
      <button aria-label="Filter View" id="filterviewmobile" onClick={() => onClick(true)} type="button" className="btn btn-outline-dark btn-sm">Filter</button>
    </div>
  );
}

const GeolocateButton = ({ onClick }) => {
  const handleClick = () => {
    ReactGA.event({
      category: 'Map',
      action: 'Click geolocation button',
    })
    onClick()
  }

  return (
    <div className="tglview">
      <button aria-label="Center map on your location" id="geolocate" onClick={handleClick} type="button" className="">
        <img alt="Crosshairs graphic" aria-label="Geolocate" id="geoImg" src={locator} />
      </button>
    </div>
  );
}

BackToListViewButton.propTypes = {
  onClick: PropTypes.func
}

MobileListToggleButton.propTypes = {
  onClick: PropTypes.func,
  isList: PropTypes.bool,
}

MobileFilterViewButton.propTypes = {
  onClick: PropTypes.func,
  isFiltered: PropTypes.bool,
}

GeolocateButton.propTypes = {
  onClick: PropTypes.func
}

export {
  BackToListViewButton,
  MobileListToggleButton,
  MobileFilterViewButton,
  GeolocateButton
};
