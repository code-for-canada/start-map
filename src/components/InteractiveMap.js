import React from 'react';
import PropTypes from "prop-types";
import runtimeEnv from '@mars/heroku-js-runtime-env';
import { GeolocateButton } from "./Buttons";
import MapLegend from './MapLegend';
import { Map as BaseMap, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet'

import * as constants from "../constants";

// Allows us to change envvars during runtime, without recompiling app on Heroku.
// See: https://github.com/mars/create-react-app-buildpack/blob/master/README.md#runtime-configuration
const env = runtimeEnv()

const mapSettings = {
  className: 'map-base',
  zoomControl: false,
  center: constants.DEFAULT_MAP_CENTER,
  zoom: constants.MAP_ZOOM_LEVEL.DEFAULT,
};

const accessToken = "pk.eyJ1Ijoic2hhcm9uLW5vbWFkaWMtbGFicyIsImEiOiJja2Q2NHRrZDMwaHEwMnFwZ3ZkYzZwNzgxIn0.G19er2tyYdwJNb0SGvgfNw"
const tileLayer = "https://api.mapbox.com/styles/v1/sharon-nomadic-labs/ckd6cz5lc1gqt1ioy3dy3f2wt/tiles/256/{z}/{x}/{y}@2x?access_token=" + accessToken;

export default class InteractiveMap extends React.Component {
  static propTypes = {
    onFeatureMapClick: PropTypes.func,
    isMobile: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.state = {
      prevActiveFeature: {},
    }
  }

  getFeatureById = (featureId) => {
    return this.map.data.getFeatureById(featureId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isMobile !== this.props.isMobile) {
      if (this.props.isMobile) {
        this.map.setOptions({zoomControl:false, streetViewControl:false})
      } else {
        this.map.setOptions({zoomControl:true, streetViewControl:true})
      }
    }
  }

  geolocation(){
    const map = this.map;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(pos);
        map.setZoom(constants.MAP_ZOOM_LEVEL.FEATURE);
      }, function() {
        handleLocationError(true, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, map.getCenter());
    }

    function handleLocationError(browserHasGeolocation, pos) {

    }
  }

  resetMap() {
    this.map.panTo(constants.DEFAULT_MAP_CENTER);
    this.map.setZoom(constants.MAP_ZOOM_LEVEL.DEFAULT);
  }

  showWardLayer = (show) => {
    const isWard = (feature) => (
      feature.getGeometry() &&
      feature.getGeometry().getType() === "MultiPolygon"
    )

    this.map.data.forEach( (feature) => {
      if (isWard(feature)) {
        this.map.data.overrideStyle(feature, { visible: show })
      }
    })
  }


  render() {
    return (
      <div className="map-container">
        <BaseMap { ...mapSettings }>
          <TileLayer
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
            url={tileLayer}
          />
          {
            this.props.features.map(feature => {
              const program = feature.properties.prgrm;
              const iconSVG = constants.ICONS_REG[program] ? constants.ICONS_REG[program].icon : constants.ICONS_REG["Other"].icon
              const icon = new L.Icon({
                iconUrl: iconSVG,
                iconRetinaUrl: iconSVG,
                iconAnchor: [12, 12],
                iconSize: [25, 25],
              })
              return(
                <Marker
                  key={feature.properties.uid}
                  position={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]}
                  icon={icon}
                  onClick={() => this.props.onFeatureMapClick(feature) }
                />
              )
            })
          }

        </BaseMap>
        <GeolocateButton onClick={this.props.handleGeolocate}/>
        <MapLegend />
      </div>
    )
  }
}

