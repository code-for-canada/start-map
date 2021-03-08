import React, { createRef, lazy, Suspense } from 'react';
import PropTypes from "prop-types";
import { Map, Marker, GoogleApiWrapper } from '@nomadiclabs/google-maps-react';
import * as _ from 'lodash';

import * as constants from "../constants";

const MapLegend = lazy(() => import('./MapLegend'));
const GeolocateButton = lazy(() => import('./GeolocateButton'));


class InteractiveMap extends React.Component {
  static propTypes = {
    onFeatureMapClick: PropTypes.func,
    isMobile: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.state = {
      prevActiveFeature: {},
      allFeatures: this.props.allFeatures,
      featuresNew: this.props.featuresNew,
      wards: {},
    }
    this.mapRef = createRef()
    this.mapSettings = {
      className: 'map-base',
      center: constants.DEFAULT_MAP_CENTER,
      zoom: constants.MAP_ZOOM_LEVEL.DEFAULT,
      minZoom: constants.MAP_ZOOM_LEVEL.MIN,
      zoomControl: true,
      fullscreenControl: false,
      mapTypeControl: false
    };
    this.map = null;
    this.infowindow = null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.featuresNew !== this.props.featuresNew) {
      this.setState({ featuresNew: this.props.featuresNew })
    }

    if (prevProps.showWardLayer !== this.props.showWardLayer) {
      this.updateWardLayerVisibility()
    }

    if (!this.props.isMobile && this.props.activeFeature && prevProps.activeFeature !== this.props.activeFeature) {
      const map = this.map
      if (map != null) {
        const coords = this.props.activeFeature.geometry.coordinates
        let center = new this.props.google.maps.LatLng(coords[1], coords[0])
        map.panTo(center)
      }
    }

    if (!this.props.isMobile && !this.props.activeFeature && prevProps.activeFeature !== this.props.activeFeature) {
      this.resetMap()
    }
  }

  geolocation = () => {
    const map = this.map
    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const center = new this.props.google.maps.LatLng(position.coords.latitude, position.coords.longitude)
        map.panTo(center);
        map.setZoom(constants.MAP_ZOOM_LEVEL.FEATURE);
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
    const map = this.map;
    if (map) {
      map.panTo(constants.DEFAULT_MAP_CENTER);
      map.setZoom(constants.MAP_ZOOM_LEVEL.DEFAULT);
    }
  }

  onMapReady = (mapProps, map) => {
    this.map = map
    map.setOptions({
      styles: constants.MAP_STYLE_BASE,
      zoomControlOptions: {
        position: this.props.google.maps.ControlPosition.TOP_RIGHT
      },
    })
    this.map.data.loadGeoJson(this.props.wardsDataSource, { idPropertyName: 'AREA_ID' })
    this.map.data.setStyle(constants.MAP_STYLE_WARD_DEFAULT)
    this.map.data.addListener('click', (e)=> this.handleMapClick(e));
  }

  handleMapClick = e => {
    const feature = e.feature;
    // Clicking a ward feature on the map.
    if (feature.getGeometry().getType() === "MultiPolygon") {
      // Clicking on a ward mulitpolygon feature on the map.
      this.map.data.revertStyle()
      this.map.data.overrideStyle(feature, constants.MAP_STYLE_WARD_ACTIVE);
      const content = `Ward ${feature.getProperty('AREA_S_CD')}: ${feature.getProperty('AREA_NAME')}`
      if (this.infowindow) {
        this.infowindow.close()
      }
      this.infowindow = new this.props.google.maps.InfoWindow({
        content: content,
        position: e.latLng
      });
      this.infowindow.open(this.map)
    }
  }

  updateWardLayerVisibility = () => {
    this.map.data.setStyle({ ...constants.MAP_STYLE_WARD_DEFAULT, visible: this.props.showWardLayer })
    if (this.infowindow) {
      this.infowindow.close()
    }
  }


  render() {
    const { loaded, google, activeFeature, onFeatureMapClick } = this.props;
    const { allFeatures, featuresNew } = this.state;
    const zoom = activeFeature ? constants.MAP_ZOOM_LEVEL.FEATURE : constants.MAP_ZOOM_LEVEL.DEFAULT
    const settings = { ...this.mapSettings, zoom }
    const center = activeFeature ? null : constants.DEFAULT_MAP_CENTER;

    if (!loaded || !google) {
      return <div className="loading" />
    }

    return (
      <div className="map-container">
        <Map
          ref={this.mapRef}
          google={google}
          initialCenter={center}
          onReady={(mapProps, map) => this.onMapReady(mapProps, map)}
          containerStyle={{ height: '100%' }}
          {...settings}
        >

          {
            featuresNew.map((id) => {
              const feature = _.find(allFeatures, { id });
              const validPrograms = ["StART Support", "Partnership Program", "Outside the Box"]
              const program = validPrograms.includes(feature.properties.program) ? feature.properties.program : "Other"
              const isSelected = activeFeature && feature.properties.uid === activeFeature.properties.uid
              const icon = {
                url: constants.ICONS_REG[program].icon,
                anchor: isSelected ? new google.maps.Point(20, 20) : new google.maps.Point(10, 10),
                scaledSize: isSelected ? new google.maps.Size(40, 40) : new google.maps.Size(20, 20),
                className: 'delay-in'
              }

              return(
                <Marker
                  key={feature.properties.uid}
                  icon={icon}
                  position={{ lng: feature.geometry.coordinates[0], lat: feature.geometry.coordinates[1] }}
                  onClick={ () => onFeatureMapClick(feature.id) }
                  zIndex={isSelected ? 2 : 1}
                />
              )
            })
          }
        </Map>
        <Suspense fallback={<div className="loading" />}>
          <GeolocateButton onClick={this.geolocation}/>
          <MapLegend />
        </Suspense>
      </div>
    )
  }
}

export default GoogleApiWrapper(
  (props) => ({
    apiKey: props.googleApiKey,
  }
))(InteractiveMap)

