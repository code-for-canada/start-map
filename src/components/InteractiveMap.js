import React, { createRef, lazy, Suspense } from 'react';
import PropTypes from "prop-types";
// import runtimeEnv from '@mars/heroku-js-runtime-env';
import { Map as BaseMap, TileLayer, ZoomControl } from 'react-leaflet'
import { GeolocateButton } from './Buttons';

import * as constants from "../constants";

const MapLegend = lazy(() => import('./MapLegend'));
const MapMarkers = lazy(() => import('./MapMarkers'));
const WardLayer = lazy(() => import('./WardLayer'));

// Allows us to change envvars during runtime, without recompiling app on Heroku.
// See: https://github.com/mars/create-react-app-buildpack/blob/master/README.md#runtime-configuration
// const env = runtimeEnv()

const mapSettings = {
  className: 'map-base',
  zoomControl: false,
  center: constants.DEFAULT_MAP_CENTER,
  zoom: constants.MAP_ZOOM_LEVEL.DEFAULT,
  fadeAnimation: true
};

const tileLayer = 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png';
const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, Imagery by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>'


export default class InteractiveMap extends React.Component {
  static propTypes = {
    onFeatureMapClick: PropTypes.func,
    isMobile: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.state = {
      prevActiveFeature: {},
      features: this.props.features,
    }
    this.mapRef = createRef()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.features !== this.props.features) {
      this.setState({ features: this.props.features })
    }

    if (!this.props.isMobile && this.props.activeFeature && prevProps.activeFeature !== this.props.activeFeature) {
      const map = this.mapRef.current
      if (map != null) {
        const coords = this.props.activeFeature.geometry.coordinates
        map.leafletElement.panTo([coords[1], coords[0]], { animate: true, duration: 0.3 })
      }
    }
  }

  geolocation = () => {
    const map = this.mapRef.current
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.leafletElement.panTo(pos);
        map.leafletElement.setZoom(constants.MAP_ZOOM_LEVEL.FEATURE);
      }, function() {
        window.alert("There was a problem getting your location.")
        this.resetMap()
      });
    } else {
      // Browser doesn't support Geolocation
      window.alert("Your browser does not support geolocation.")
    }
  }

  resetMap = () => {
    const map = this.mapRef.current;
    map.leafletElement.panTo(constants.DEFAULT_MAP_CENTER);
    map.leafletElement.setZoom(constants.MAP_ZOOM_LEVEL.DEFAULT);
  }

  render() {
    const zoom = this.props.activeFeature ? constants.MAP_ZOOM_LEVEL.FEATURE : constants.MAP_ZOOM_LEVEL.DEFAULT
    const zoomControlPosition = this.props.isMobile ? 'topleft' : 'topright'
    const settings = { ...mapSettings, zoom }
    const center = this.props.activeFeature ? null : constants.DEFAULT_MAP_CENTER;

    return (
      <div className="map-container">
        <BaseMap {...settings} ref={this.mapRef} center={center}>
          <TileLayer
            attribution={attribution}
            url={tileLayer}
          />
          <ZoomControl position={zoomControlPosition} />
          <GeolocateButton onClick={this.geolocation}/>
          <Suspense fallback={<div className="loading" />}>
            <MapMarkers
              features={this.state.features}
              activeFeature={this.props.activeFeature}
              onFeatureMapClick={this.props.onFeatureMapClick}
            />
            <WardLayer showWardLayer={this.props.showWardLayer} />
           </Suspense>
        </BaseMap>
        <Suspense fallback={<div className="loading" />}>
          <MapLegend />
        </Suspense>
      </div>
    )
  }
}

