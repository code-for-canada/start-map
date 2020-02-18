import React, { Component } from "react";
import PropTypes from "prop-types";
import locator from '../assets/locate.png';

class BackToListViewButton extends Component {
  static propTypes = {
    click: PropTypes.func,
  }

  handleClick = (event) => {
    // TODO: #ask what this is supposed to do.
    //this.props.click()
  }

  render() {
    return (
      <button
        aria-label="Back"
        id="back"
        onClick={this.handleClick}
        type="button"
        className="btn btn-light"
      >
        ← Back
      </button>
    );
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
    click: PropTypes.func,
    filtered: null,
  }

  handleClick = (event) => {
    this.props.click(true)
  }

  render() {
    let filterBubble
    if (this.props.filtered){
      filterBubble = <div id="filterBubble"></div>
    }
    return (
      <div className="tglview">
      {filterBubble}
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
