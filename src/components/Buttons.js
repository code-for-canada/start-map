import React, { Component } from "react";
import PropTypes from "prop-types";
import locator from '../assets/locate.png';

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

class ToggleViewButton extends React.Component {
  static propTypes = {
    click: PropTypes.func,
    state: PropTypes.bool,
  }

  state = {
    isToggleOn: this.props.state,
  }

  handleClick = (event) => {
    this.props.click(this.state.isToggleOn);
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <div className="tglview">
        <button onClick={this.handleClick} className="btn btn-light">
          {this.state.isToggleOn ? 'Map' : 'List'}
        </button>
      </div>

    );
  }
}
export { ToggleViewButton };

class MobileFilterViewButton extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
    isFiltered: PropTypes.bool,
  }

  handleClick = (event) => {
    this.props.onClick(true)
  }

  render() {
    return (
      <div className="tglview">
        { this.props.isFiltered ? <div id="filterBubble"></div> : null }
        <button aria-label="Filter View" id="filterviewmobile" onClick={this.handleClick} type="button" className="btn btn-light">Filter</button>
      </div>

    );
  }
}
export { MobileFilterViewButton };

class GeolocateButton extends Component {
  static propTypes = {
    click: PropTypes.func,
  }

  handleClick = (event) => {
    this.props.click()
  }

  render() {
    return (
      <div className="tglview">
      <button aria-label="Center map on your location" id="geolocate" onClick={this.handleClick} type="button" className="btn btn-light"><img aria-label="Geolocate" id="geoImg" src={locator}/></button>
      </div>

    );
  }
}
export { GeolocateButton };
