import React, { createRef } from 'react';
import PropTypes from "prop-types";
import runtimeEnv from '@mars/heroku-js-runtime-env';
import { GeolocateButton } from "./Buttons";
import MapLegend from './MapLegend';
import { Map as BaseMap, TileLayer, Marker, GeoJSON, ZoomControl } from 'react-leaflet'
import L from 'leaflet'
import hash from 'object-hash';

import * as constants from "../constants";

// Allows us to change envvars during runtime, without recompiling app on Heroku.
// See: https://github.com/mars/create-react-app-buildpack/blob/master/README.md#runtime-configuration
const env = runtimeEnv()

const mapSettings = {
  className: 'map-base',
  zoomControl: false,
  center: constants.DEFAULT_MAP_CENTER,
  zoom: constants.MAP_ZOOM_LEVEL.DEFAULT,
  fadeAnimation: true
};

const accessToken = env.REACT_APP_MAPBOX_TOKEN
const tileLayer = "https://api.mapbox.com/styles/v1/sharon-nomadic-labs/ckd6cz5lc1gqt1ioy3dy3f2wt/tiles/256/{z}/{x}/{y}@2x?optimize=true&access_token=" + accessToken;

const icons = {
  "Partnership Program": {
    icon: new L.Icon({
      iconUrl: constants.ICONS_REG["Partnership Program"].icon,
      iconRetinaUrl: constants.ICONS_REG["Partnership Program"].icon,
      iconAnchor: [12, 12],
      iconSize: [25, 25],
    })
  },
  "Outside the Box": {
    icon: new L.Icon({
      iconUrl: constants.ICONS_REG["Outside the Box"].icon,
      iconRetinaUrl: constants.ICONS_REG["Outside the Box"].icon,
      iconAnchor: [12, 12],
      iconSize: [25, 25],
    })
  },
  "StART Support": {
    icon: new L.Icon({
      iconUrl: constants.ICONS_REG["StART Support"].icon,
      iconRetinaUrl: constants.ICONS_REG["StART Support"].icon,
      iconAnchor: [12, 12],
      iconSize: [25, 25],
    })
  },
  "Other": {
    icon: new L.Icon({
      iconUrl: constants.ICONS_REG["Other"].icon,
      iconRetinaUrl: constants.ICONS_REG["Other"].icon,
      iconAnchor: [12, 12],
      iconSize: [25, 25],
    })
  }
};


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
      wardData: {},
    }
    this.mapRef = createRef()
  }

  componentDidMount() {
    this.fetchWards()
  }

  fetchWards = () => {
    fetch('geojson/wards.json')
      .then(response => response.json())
      .then(json => {
        this.setState({ wardData: json })
      });
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

  geoJSONstyle = () => {
    return {
      color: '#64aae2',
      weight: 2,
      fillOpacity: 0.1,
      fillColor: '#64aae2',
    }
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
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
            url={tileLayer}
          />
          <ZoomControl position={zoomControlPosition} />
          {
            this.state.features.map(feature => {
              const program = icons[feature.properties.prgrm] ? feature.properties.prgrm : "Other"
              let icon = icons[program].icon
              const isSelected = this.props.activeFeature && feature.properties.uid == this.props.activeFeature.properties.uid
              if (isSelected) {
                icon = new L.Icon({
                  iconUrl: constants.ICONS_REG[program].icon,
                  iconRetinaUrl: constants.ICONS_REG[program].icon,
                  iconAnchor: [25, 25],
                  iconSize: [50, 50]
                })
              }

              return(
                <Marker
                  key={feature.properties.uid}
                  position={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]}
                  icon={icon}
                  onClick={() => this.props.onFeatureMapClick(feature) }
                  zIndexOffset={isSelected ? 9999 : 0}
                />
              )
            })
          }
          { this.props.showWardLayer &&
            <GeoJSON
              key={hash(this.state.wardData)}
              data={this.state.wardData.features}
              style={this.geoJSONstyle}
            />
          }
        </BaseMap>
        <GeolocateButton onClick={this.geolocation}/>
        <MapLegend />
      </div>
    )
  }
}

