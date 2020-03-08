import React, { Component } from "react";
import PropTypes from "prop-types";
import locator from '../assets/locate.png';
import ReactGA from 'react-ga';

class BackToListViewButton extends Component {
  static propTypes = {
    onClick: PropTypes.func,
  }

  render() {
    return (
      <div className="BackToListView" onClick={this.props.onClick}>
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
}
export { BackToListViewButton };

class MobileListToggleButton extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
    isList: PropTypes.bool,
  }

  handleClick = () => {
    this.props.onClick();
  }

  render() {
    const { isList } = this.props;
    return (
      <div className="tglview">
        <button onClick={this.handleClick} className="btn btn-light">
          {isList ? 'Map' : 'List'}
        </button>
      </div>
    );
  }
}
export { MobileListToggleButton };

class MobileFilterViewButton extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
    isFiltered: PropTypes.bool,
  }

  handleClick = () => {
    this.props.onClick(true)
  }

  render() {
    const { isFiltered } = this.props;
    return (
      <div id="filter">
        <div className="tglview">
          { isFiltered ? <div id="filterBubble"></div> : null }
          <button aria-label="Filter View" id="filterviewmobile" onClick={this.handleClick} type="button" className="btn btn-light">Filter</button>
        </div>
      </div>
    );
  }
}
export { MobileFilterViewButton };

class GeolocateButton extends Component {
  static propTypes = {
    onClick: PropTypes.func,
  }

  handleClick = () => {
    ReactGA.event({
      category: 'Map',
      action: 'Click geolocation button',
    })
    this.props.onClick()
  }

  render() {
    return (
      <div className="tglview">
        <button aria-label="Center map on your location" id="geolocate" onClick={this.handleClick} type="button" className="btn btn-light">
          <img alt="Crosshairs graphic" aria-label="Geolocate" id="geoImg" src={locator}/>
        </button>
      </div>
    );
  }
}
export { GeolocateButton };
