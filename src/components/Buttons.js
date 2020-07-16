import React from "react";
import PropTypes from "prop-types";
import locator from '../assets/img/crosshair.svg';
import ReactGA from 'react-ga';

const BackToListViewButton = React.forwardRef((props, ref) => {
  return (
    <div className="back-to-list" onClick={props.onClick}>
      <button
        ref={ref}
        aria-label="Back"
        id="back"
        type="button"
        className="btn btn-light"
      >
        ← Back
      </button>
    </div>
  )
})

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
      { isFiltered ? <div id="filter-marker"></div> : null }
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
    <button aria-label="Center map on your location" id="geolocate-btn" onClick={handleClick} type="button" className="">
      <img alt="Crosshairs graphic" aria-label="Geolocate" id="crosshairs" src={locator} />
    </button>
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
