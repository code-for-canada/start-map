import React from 'react';
import PropTypes from "prop-types";
import runtimeEnv from '@mars/heroku-js-runtime-env';

import * as constants from "../constants";

// Allows us to change envvars during runtime, without recompiling app on Heroku.
// See: https://github.com/mars/create-react-app-buildpack/blob/master/README.md#runtime-configuration
const env = runtimeEnv()


export default class InteractiveMap extends React.Component {
  static propTypes = {
    onFeatureMapClick: PropTypes.func,
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

  render() {
    return (
      <div id="theMap">
        <div id='map' ref="map"></div>
      </div>
    )
  }

  componentDidMount() {

    // See: https://engineering.universe.com/building-a-google-map-in-react-b103b4ee97f1
    const googleMapScript = document.createElement('script')
    // We're using the default weekly channel, which is fine so long as we're
    // using official library API calls. If there are ever more issues with
    // random crashes when we didn't push any code changes ourselves, try
    // locking the version to a previous numeric one.
    // See: https://developers.google.com/maps/documentation/javascript/versions
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=weekly`
    window.document.body.appendChild(googleMapScript)

    googleMapScript.addEventListener('load', () => {
      // create the map, marker and infoWindow after the component has
      // been rendered because we need to manipulate the DOM for Google =(
      this.map = this.createMap()
      this.prepareMap();
      this.map.data.loadGeoJson('geojson/ftrs.json', { idPropertyName: 'uid' })
      this.map.data.loadGeoJson('geojson/wards.json', { idPropertyName: 'AREA_ID' })

      this.map.data.addListener('click', (e)=> this.handleFeatureClick(e));
    })
  }

  // clean up event listeners when component unmounts
  componentDidUnMount() {
    window.google.maps.event.clearListeners(this.map, 'zoom_changed')
  }

  createMap() {
    let mapOptions = {
      center: constants.DEFAULT_MAP_CENTER,
      zoom: constants.MAP_ZOOM_LEVEL.DEFAULT,
      mapTypeControl: false,
      fullscreenControl: false,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      styles: constants.MAP_STYLE_BASE,
    }
    return new window.google.maps.Map(this.refs.map, mapOptions)
  }

  /**
   * Iterates through Feature objects in FeatureCollecton, and checks properties
   * for values matching the active options in the Select dropdown. If active
   * for each filter (year, ward, program), makes feature visible and appends to
   * "li" array; otherwise hides Feature.
   *
   * @param {Select.OptionsType} activeYearOpts -
   * @param {Select.OptionsType} activeWardOpts -
   * @param {Select.OptionsType} activeProgramOpts -
   * @see https://react-select.com/props
   *
   * @returns {undefined}
   */
  filterMap(activeYearOpts, activeWardOpts, activeProgramOpts, setVisibleFeatures) {
    let visibleFeatures = [];

    let map = this.map;
    map.data.forEach(function(feature) {
      const checkForKeep = (feature, propName, activeOpts) => {
        for (let i = 0; i < activeOpts.length; i++) {
          if (feature.getProperty(propName) &&
            feature.getProperty(propName).toString() === activeOpts[i].value.toString()
          ) {
            return true;
          }
        }
        return false;
      }

      let keepForYear = checkForKeep(feature, 'yr', activeYearOpts)
      let keepForWard = checkForKeep(feature, 'ward', activeWardOpts)
      let keepForProgram = checkForKeep(feature, 'prgrm', activeProgramOpts)

      const isArtwork = (feature) => (
        feature.getGeometry() !== null &&
        feature.getGeometry().getType() === 'Point'
      )

      if (isArtwork(feature)) {
        if (keepForYear && keepForWard && keepForProgram) {
          map.data.overrideStyle(feature, { visible: true });
          visibleFeatures.push({
            key: feature.getProperty('uid').toString(),
            uid: feature.getProperty('uid'),
            artist: feature.getProperty('artist'),
            yr: feature.getProperty('yr'),
            address: feature.getProperty('address'),
            media: feature.getProperty("media"),
          })
        } else {
          map.data.overrideStyle(feature, { visible: false });
        }
      }
    })

    setVisibleFeatures(visibleFeatures);
  }

  /**
   * This handler deals with both clicks to map features (both ward and
   * artwork), but also clicks to a FeatureListItem.
   */
  handleFeatureClick(e){
    // If we're clicking on the map, the feature is in a property, otherwise
    // it's the whole event object. TODO split into separate functions.
    const isMapClickEvent = (!!e.feature)
    let feature = isMapClickEvent ? e.feature : e

    // Revert the previously selected feature's style.
    this.map.data.revertStyle(this.state.prevActiveFeature);
    // Required because default ward style is invisible.
    this.map.data.overrideStyle(this.state.prevActiveFeature, {visible: true})

    // Clicking on an artwork point feature on the map.
    if (feature.getGeometry().getType() === "Point") {
      const prgrm = feature.getProperty('prgrm');
      if (prgrm !== "Partnership Program" && prgrm !==  "Outside the Box" && prgrm !==  "StART Support"){
        feature.setProperty('prgrm', "Other");
      };
      this.map.data.overrideStyle(feature, {
        // Ensure active marker always on top.
        zIndex: 10000,
        icon: constants.ICONS_LRG[prgrm].icon,
      });
    }

    // Clicking a ward feature on the map.
    if (feature.getGeometry().getType() === "MultiPolygon") {
      // Clicking on a ward mulitpolygon feature on the map.
      this.map.data.overrideStyle(feature, constants.MAP_STYLE_WARD_ACTIVE);
    }

    this.setState({ prevActiveFeature: feature })

    if (isMapClickEvent) {
      // Clicking a feature object on the map.
      this.props.onFeatureMapClick(feature)
    } else {
      // Otherwise, must be FeatureListItem click.
      // Pan to the LatLng object coordinates.
      // See: https://stackoverflow.com/a/30130908
      this.map.panTo(feature.getGeometry().get())
      this.map.setZoom(constants.MAP_ZOOM_LEVEL.FEATURE);
    }
  };

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

  /**
   * Set up the custom styling for our map.
   */
  prepareMap = () => {
    this.map.data.setStyle(function(feature){
      var geo = feature.getGeometry();
      var prgrm = feature.getProperty('prgrm');
      if (prgrm !== "Partnership Program" && prgrm !==  "Outside the Box" && prgrm !==  "StART Support"){
        feature.setProperty('prgrm', "Other");
      };
      var type = "";
      if (geo) {
        type = geo.getType();
      }

      if (type === "MultiPolygon") {
        return constants.MAP_STYLE_WARD_DEFAULT;
      } else {
        return ({
          icon: constants.ICONS_REG[feature.getProperty('prgrm')].icon,
          visible: true
        });
      }

    })
  }

  prepareMapMobile() {
    this.prepareMap()
    this.map.setOptions({zoomControl:false, streetViewControl:false})
  }

  prepareMapDesktop() {
    this.prepareMap()
    this.map.setOptions({zoomControl:true, streetViewControl:true})
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
}

