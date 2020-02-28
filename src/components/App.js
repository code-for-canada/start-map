import React from 'react';
// See: https://create-react-app.dev/docs/adding-bootstrap/
import 'bootstrap/dist/css/bootstrap.min.css'; // Must come first.
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LazyLoad from 'react-lazyload';
import ReactGA from 'react-ga';
import 'simplebar/dist/simplebar.css';
import sort from 'fast-sort';
import logo from '../assets/logo.svg';
import runtimeEnv from '@mars/heroku-js-runtime-env';

import PropTypes from "prop-types";

import BetaBanner from "./BetaBanner";
import Splash from "./Splash";
import YearDropdown from "./YearDropdown";
import WardDropdown from "./WardDropdown";
import ProgramDropdown from "./ProgramDropdown";
import WardToggle from "./WardToggle";
import SortDropdown from "./SortDropdown";
import FeatureDetail from "./FeatureDetail";
import {
  BackToListViewButton,
  MobileListToggleButton,
  MobileFilterViewButton,
  GeolocateButton,
} from "./Buttons";

import * as constants from "../constants";
import * as utils from "../utils";

import placeholder from '../assets/placeholder.jpg';

// Allows us to change envvars during runtime, without recompiling app on Heroku.
// See: https://github.com/mars/create-react-app-buildpack/blob/master/README.md#runtime-configuration
const env = runtimeEnv()

class FeatureListItem extends React.Component {
  static propTypes = {
    uid: PropTypes.number,
    imgid: PropTypes.arrayOf(PropTypes.string),
    artistName: PropTypes.string,
    address: PropTypes.string,
    year: PropTypes.number,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    uid: 0,
  }

  handleClick = () => {
    ReactGA.event({
      category: 'Artwork',
      action: 'View details',
      label: this.props.artistName,
      value: this.props.uid,
    })
    this.props.onClick(this.props.uid)
  }

  render() {
    let f;
    if (this.props.imgid[0]){
      f = `${process.env.REACT_APP_IMAGE_URL_PREFIX}/${this.props.imgid[0]}.jpg`;
    } else {
      f = placeholder
    }
    return (
      <div className='lv-tile' onClick={this.handleClick}>
        <div className='lv-tile-pic'>
          <LazyLoad height={100} offset={30} overflow={true} resize={true}>
            <img
              aria-label="Thumbnail Preview"
              className="list-img"
              src={f}
              onError={utils.handleMissingImage}
            />
          </LazyLoad>
        </div>
        <div className="lv-tile-txt">
          <h5 className='tileArtist'>
            {this.props.artistName}
          </h5>
          <p className='tileAddress'>
            {this.props.address}
          </p>
          <p className='tileYear'>
            {this.props.year}
          </p>
        </div>
      </div>

    );
  }
}
class FeatureList extends React.Component {
  static propTypes = {
    features: PropTypes.arrayOf(PropTypes.object),
    onItemClick: PropTypes.func,
  }

  render() {
    return (
      <div id="list">
        {this.props.features.map(f =>
          <FeatureListItem
            key={f.uid}
            uid={f.uid}
            artistName={f.artist}
            address={f.address}
            year={f.yr}
            imgid={f.img_code}
            onClick={this.props.onItemClick}
          />
        )}
      </div>
    )
  }
}

class GMap extends React.Component {
  static propTypes = {
    onFeatureMapClick: PropTypes.func,
    ftr: PropTypes.object,
  }

  state = {
    // TODO: Figure out why this needs to be a number.
    oldSelected: 1,
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
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&v=weekly`
    window.document.body.appendChild(googleMapScript)

    googleMapScript.addEventListener('load', () => {
      // create the map, marker and infoWindow after the component has
      // been rendered because we need to manipulate the DOM for Google =(
      this.map = this.createMap()
      this.prepareMap();
      this.map.data.loadGeoJson('geojson/ftrs.json', { idPropertyName: 'uid' })
      this.map.data.loadGeoJson('geojson/wards.json', { idPropertyName: 'AREA_ID' })

      this.map.data.addListener('click', (e)=> this.handleFtrClick(e));
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
      styles: [
        {
          "featureType": "poi.business",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.business",
          "elementType": "geometry",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.business",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        }
      ]
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
            img_code: feature.getProperty("img_code"),
          })
        } else {
          map.data.overrideStyle(feature, { visible: false });
        }
      }
    })
    setVisibleFeatures(visibleFeatures);
  }

  handleFtrClick(e){
    let prgrm;
    let feature;
    console.log("e")
    console.log(e)
    if (e.feature && e.feature.getGeometry().getType() === "Point") {
      feature = e.feature
      // Clicking on a point on the map.
      prgrm = feature.getProperty('prgrm');
      if (prgrm !== "Partnership Program" && prgrm !==  "Outside the Box" && prgrm !==  "StART Support"){
        feature.setProperty('prgrm', "Other");
      };
      console.log(this.state.oldSelected)
      if (this.state.oldSelected === 1){
        this.map.data.revertStyle(this.state.oldSelected);
      } else if (this.state.oldSelected.getGeometry().getType() === "Point"){
        this.map.data.revertStyle(this.state.oldSelected);
      } else if (this.state.oldSelected.getGeometry().getType() === "MultiPolygon") {
        this.map.data.overrideStyle(this.state.oldSelected, {
          visible: true,
          fillColor: 'DarkGray',
          strokeColor: "Gray",
          strokeWeight: 2,
        });
      }

      this.setState({
        oldSelected: feature
      });
      this.map.data.overrideStyle(feature, {
        icon: constants.ICONS_LRG[prgrm].icon
      });
      this.props.onFeatureMapClick(feature);


    } else if (typeof e.getGeometry === 'function' && e.getGeometry().getType() === "Point") { //for zooming in on a point when a tile in the list is clicked
      feature = e
      // Clicking on a artwork point feature in the list.
      prgrm = feature.getProperty('prgrm');
      if (prgrm !== "Partnership Program" && prgrm !==  "Outside the Box" && prgrm !==  "StART Support"){
        feature.setProperty('prgrm', "Other");
      };
      this.map.data.revertStyle(this.state.oldSelected);
      this.setState({
        oldSelected: feature
      });

      this.map.data.overrideStyle(feature, {
        icon: constants.ICONS_LRG[prgrm].icon
      });
      // panTo the LatLng object coordinates.
      // See: https://stackoverflow.com/a/30130908
      this.map.panTo(feature.getGeometry().get())
      this.map.setZoom(constants.MAP_ZOOM_LEVEL.FEATURE);
      return;
    } else {
      // Clicking on a ward mulitpolygon feature on the map.
      this.map.data.overrideStyle(this.state.oldSelected, {
        visible: true,
        fillColor: 'DarkGray',
        strokeColor: "Gray",
        strokeWeight: 2,
      });
    }

    this.setState({
      oldSelected: e.feature
    });
    console.log("second")
    console.log(e)
    this.props.onFeatureMapClick(e.feature);
    this.map.data.overrideStyle(e.feature, {
      fillColor: 'LightBlue',
      strokeColor: "MidnightBlue",
      strokeWeight: 3
    });
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
        prgrm = "Other";
      };
      var type = "";
      if (geo) {
        type = geo.getType();
      }

      if (type === "MultiPolygon") {
        return({
          visible: false,
          fillColor: 'DarkGray',
          strokeColor: "Gray",
          strokeWeight: 2
        });
      } else {
        return ({
          icon: constants.ICONS_REG[prgrm].icon,
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

export default class App extends React.Component {

  state = {
    /** Array of visible feature points in maps and lists. (visibleFeatures) */
    visFtrs: [],
    /** The type of view.
     * Options: list, detail, map, filter
     * Last two only display differently on mobile. */
    viewType: "map",
    /** Full object representing active artwork. */
    activeFeature: {},
    /** Keep track of whether any filters are applied. */
    isFiltered: false,
    /** Array of year OptionTypes to filter features by. */
    years: constants.YEAR_OPTS,
    /** Array of ward OptionTypes to filter features by. */
    wards: constants.WARD_OPTS,
    /** Array of program OptionTypes to filter features by. */
    programs: constants.PROGRAM_OPTS,
    /** Whether the view is mobile based on screen width. */
    isMobileView: window.innerWidth <= 1024,
    /** Boolean controlling whether to show ward layer on map. */
    showWardLayer: false,
    /** Boolean controlling whether to show splash popup. */
    showSplash: true,
    /** Integer controlling which sort method for all feature lists. */
    sortType: 'artist-asc',
  }

  initReactGA = () => {
    ReactGA.initialize(env.REACT_APP_GOOGLE_ANALYTICS_ID);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  componentDidMount(){
    this.initReactGA();
    this.fetchFeatures();
    window.addEventListener("resize", this.resize.bind(this));
  }

  fetchFeatures() {
    fetch('geojson/ftrs.json')
      .then(response => response.json())
      .then(json => {
        this.setState(
          { visFtrs: json.features.map(f => f.properties) },
          // Sort after first load.
          () => { this.sortList() }
        );
      });
  }

  resize() {
    this.setState({
      isMobileView: window.innerWidth <= 1024
    });
    if (this.state.isMobileView) {
      this.refs.mapControl.prepareMapMobile();
    } else {
      this.refs.mapControl.prepareMapDesktop();
    }
  }

  closeSplash = () => {
    this.setState({
      showSplash: false
    })
  }

  showMobileDetail = () =>{
    this.setState({
      viewType: "detail",
    });
  }

  setVisibleFeatures = (visFtrs) => {
    this.setState(
      {visFtrs: visFtrs},
      () => { this.sortList() }
    );
  }

  triggerFilterMap(yrs, wrds, prgrms) {
    this.refs.mapControl.filterMap(yrs, wrds, prgrms, this.setVisibleFeatures);
    this.refs.mapControl.resetMap();
  }

  handleSelectYears = (selectedOptions) => {
    this.handleSelected('years', selectedOptions)
  }

  handleSelectWards = (selectedOptions) => {
    this.handleSelected('wards', selectedOptions)
  }

  handleSelectPrograms = (selectedOptions) => {
    this.handleSelected('programs', selectedOptions)
  }

  handleSelected = (stateKey, selectedOptions) => {
    this.setState(
      { [stateKey]: selectedOptions },
      () => {
        this.triggerFilterMap(this.state.years, this.state.wards, this.state.programs)
        this.checkFiltered(this.state.years, this.state.wards, this.state.programs)
      }
    )
  }

  checkFiltered (activeYearOpts, activeWardOpts, activeProgramOpts) {
    const isFiltered = (
      activeYearOpts.length < constants.YEAR_OPTS.length ||
      activeWardOpts.length < constants.WARD_OPTS.length ||
      activeProgramOpts.length < constants.PROGRAM_OPTS.length ||
      false
    )
    this.setState({ isFiltered: isFiltered });
  }

  toggleWardLayer = () => {
    this.setState(
      prevState => ({showWardLayer: !prevState.showWardLayer}),
      () => {
        this.refs.mapControl.showWardLayer(this.state.showWardLayer)
        ReactGA.event({
          category: 'Map',
          action: 'Toggle ward layer',
          label: this.state.showWardLayer ? 'turned on' : 'turned off',
        })
      }
    )
  }

  setSortType = (sortType) => {
    // Sort the list after setting state.
    this.setState(
      { sortType: sortType },
      () => { this.sortList() }
    )
  }

  sortList = () => {
    let sortedList = [];
    switch(this.state.sortType) {
      case 'artist-asc':
      default:
        sortedList = sort(this.state.visFtrs).asc(u => u.artist)
        break
      case 'artist-desc':
        sortedList = sort(this.state.visFtrs).desc(u => u.artist)
        break
      case 'year-asc':
        sortedList = sort(this.state.visFtrs).asc(u => u.yr)
        break
      case 'year-desc':
        sortedList = sort(this.state.visFtrs).desc(u => u.yr)
        break
    }
    this.setState({visFtrs: sortedList})
  }

  handleGeolocate = () => {
    this.refs.mapControl.geolocation();
  }

  handleMapClick = (feature) => {
    ReactGA.event({
      category: 'Map',
      action: 'Clicked feature',
      label: 'ward or artwork',
    })
    if (this.state.isMobileView) {
      this.setState({
        viewType: "map",
        activeFeature: feature,
      });
    } else {
      this.setState({
        viewType: "detail",
        activeFeature: feature,
      });
    }
  }

  /**
   * Handle when a feature div in a list is clicked, storing feature data in top
   * level and moving map as appropriate.
   *
   * @param {number} featureId
   * @returns {undefined}
   */
  handleFeatureListItemClick = (featureId) => {
    let featureData = this.refs.mapControl.getFeatureById(featureId)

    this.setState({
      viewType: "detail",
      activeFeature: featureData,
    });
    this.refs.mapControl.handleFtrClick(featureData)
  }

  handleClickBackButton = () => {
    this.setState({
      viewType: "map"
    })
  }

  setMobileFilterView = () => {
    this.setState({ viewType: "filter" });
  }

  toggleListViewMobile = () => {
    this.setState(prevState =>({
      viewType: prevState.viewType === 'list' ? 'map' : 'list'
    }))
  }

  render() {
    const {
      showSplash,
      visFtrs,
      activeFeature,
      isMobileView,
      viewType,
      sortType,
    } = this.state;

    const renderLogo = (wrapperClass = "logo-wrap") => (
      <div className={wrapperClass}>
        <img aria-label="Logo" className="logo" src={logo}/>
        <h3 className="logo">StreetARToronto</h3>
      </div>
    )

    const renderFilters = () => (
      <React.Fragment>
        <p>Filter by year</p>
        <YearDropdown onSelect={this.handleSelectYears} selected={this.state.years}/>

        <p>Filter by ward</p>
        <WardDropdown onSelect={this.handleSelectWards} selected={this.state.wards}/>

        <p>Filter by program</p>
        <ProgramDropdown onSelect={this.handleSelectPrograms} selected={this.state.programs}/>

        <p>Ward layer</p>
        <WardToggle onClick={this.toggleWardLayer} showWardLayer={this.state.showWardLayer} />
      </React.Fragment>
    )

    const renderListing = () => (
      <div id={ isMobileView ? "list-wrap-mobile" : "list-wrap" }>
        <p id="listSum">{visFtrs.length} Results</p>
        <p id="sortBy">Sort by</p>
        <SortDropdown onSelect={this.setSortType} sortType={sortType} />
        <FeatureList features={visFtrs} onItemClick={this.handleFeatureListItemClick} />
      </div>
    )

    /**
     * Renders the little hovering popup at the bottom of mobile map view, in
     * which ward and artwork data are shown when clicked/active.
     */
    const renderMobileMapPopUp = () => {
      if (typeof activeFeature.getProperty === "undefined" ) { return null }
      const getFeatureImageSrc = () => {
        let imageIds = activeFeature.getProperty('img_code')
        if (imageIds) {
          return `${process.env.REACT_APP_IMAGE_URL_PREFIX}/${imageIds[0]}.jpg`
        }
        return ''
      }

      const hasImage = getFeatureImageSrc().length !== 0;

      let artworkImage =
        <div className='popup-pic'>
          <img aria-label="Thumbnail Preview" src={getFeatureImageSrc()} className="list-img" onError={utils.handleMissingImage}/>
        </div>

      return (
        <div id="MobileMapPopUp" onClick={this.showMobileDetail}>
          { hasImage ? artworkImage : null }
          <div className="popup-txt">
            { hasImage ?
              // This is a point feature for artwork, with images.
              <React.Fragment>
                <p>
                  <strong className='tileArtist'>
                    {activeFeature.getProperty('artist')}
                  </strong>
                </p>
                <p className='tileAddress'>
                  {activeFeature.getProperty('address')}
                </p>
                <p className='tileYear'>
                  Created in {activeFeature.getProperty('yr')}
                </p>
              </React.Fragment>
            :
              // This is a polygon feature for ward, without images.
              <h5 className='detailWard'>
                Ward {activeFeature.getProperty('AREA_L_CD')} <br/>
                {activeFeature.getProperty('AREA_NAME')}
              </h5>
            }
          </div>
        </div>
      )
    }

    const renderDesktopView = (viewType) => {
      switch (viewType) {
        default:
        case "filter":
        case "list":
          return (
            <div className="nav-wrap">
              <div className="filter-wrap">
                { renderFilters() }
              </div>

              { renderListing() }
            </div>
          )
        case "detail":
          return (
            <React.Fragment>
              <BackToListViewButton onClick={this.handleClickBackButton} />
              <FeatureDetail feature={activeFeature} />
            </React.Fragment>
          )
      }
    }

    const renderMobileView = (viewType) => {
      switch (viewType) {
        case "list":
          return (
            <div>
              { renderLogo() }
              <MobileListToggleButton onClick={this.toggleListViewMobile} isList={viewType === 'list'}/>
              <MobileFilterViewButton onClick={this.setMobileFilterView} isFiltered={this.state.isFiltered}/>

              { renderListing() }
            </div>
          )
        case "detail":
          return (
            <div className="detailMob">
              { renderLogo('logo-wrap-detail-mobile') }
              <BackToListViewButton onClick={this.handleClickBackButton} />
              <FeatureDetail feature={activeFeature}/>
            </div>
          )
        case "filter":
          return (
            <div className="filter-wrap">
              <BackToListViewButton onClick={this.handleClickBackButton} />
              { renderFilters() }
            </div>
          )
        default:
          return (
            <React.Fragment>
              { renderLogo() }
              <MobileListToggleButton onClick={this.toggleListViewMobile} isList={viewType === "list"}/>
              <MobileFilterViewButton onClick={this.setMobileFilterView} isFiltered={this.state.isFiltered}/>

              { renderMobileMapPopUp() }
            </React.Fragment>
          )
      }
    }

    return (
      <div className="parent">
        { showSplash ? <Splash onButtonClick={this.closeSplash} isMobile={isMobileView} /> : null }
        <BetaBanner isMobile={isMobileView}/>
        <GMap onFeatureMapClick={this.handleMapClick} ftr={activeFeature} ref="mapControl" />
        <GeolocateButton onClick={this.handleGeolocate}/>

        <div id="nav">
          { renderLogo("logo") }
          { isMobileView ? null : renderDesktopView(viewType) }
        </div>
        { isMobileView ? renderMobileView(viewType) : null }
      </div>
    )
  }
}
