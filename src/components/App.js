import React from 'react';
// See: https://create-react-app.dev/docs/adding-bootstrap/
import 'bootstrap/dist/css/bootstrap.min.css'; // Must come first.
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LazyLoad from 'react-lazyload';
import 'simplebar/dist/simplebar.css';
import sort from 'fast-sort';
import logo from '../assets/logo.svg';

import PropTypes from "prop-types";

import BetaBanner from "./BetaBanner";
import Splash from "./Splash";
import YearDropdown from "./YearDropdown";
import WardDropdown from "./WardDropdown";
import ProgramDropdown from "./ProgramDropdown";
import WardToggle from "./WardToggle";
import SortDropdown from "./SortDropdown";
import FeatureSlider from "./FeatureSlider";
import {
  BackToListViewButton,
  MobileListToggleButton,
  MobileFilterViewButton,
  GeolocateButton,
} from "./Buttons";

import * as constants from "../constants";

import placeholder from '../assets/placeholder.jpg';

function handleMissingImage(e) {
  e.target.onerror = null;
  e.target.src = placeholder;
}

class FeatureListItem extends React.Component {
  static propTypes = {
    uid: PropTypes.number,
    imgid: PropTypes.arrayOf(PropTypes.string),
    artistName: PropTypes.string,
    address: PropTypes.string,
    year: PropTypes.number,
    onClick: PropTypes.func,
  }

  handleClick = () => {
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
      <a href="#" className='lv-tile' onClick={this.handleClick}>
        <LazyLoad height={100} offset={30} overflow={true} resize={true}>
          <div className='lv-tile-pic'>
            <img
              aria-label="Thumbnail Preview"
              className="list-img"
              src={f}
              onError={handleMissingImage}
            />
          </div>
        </LazyLoad>
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
      </a>

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
class FeatureDetail extends React.Component {
  static propTypes = {
    /** Feature data object from map data. */
    feature: PropTypes.object.isRequired,
  }

  /**
   * @typedef {Object} ImageData
   * @property {number} key -
   * @property {string} img - A string referencing an image URL.
   * @property {string} alt - Alt text for describing image.
   */

  /**
   * Return an array of image data objects from a feature object.
   *
   * @param {Feature} ftr - A feature object representing map data.
   * @returns {Array} - An array of image data objects.
   */
  getImagesData = (ftr) => {
    let imagesData = [];
    if (ftr.getGeometry().getType() === "Point") {
      let imageIds = ftr.getProperty('img_code')

      const isNoImages = () => (imageIds.length === 0)
      if (isNoImages()) {
        imagesData = [{
          imageSrc: placeholder,
          imageAltText: "Image not available.",
        }]
      } else {
        imagesData = imageIds.map( id => ({
          imageSrc: `${process.env.REACT_APP_IMAGE_URL_PREFIX}/${id}.jpg`,
          imageAltText: "Photo of artwork.",
        }))
      }
    }
    return imagesData;
  }

  render() {
    const { feature } = this.props;

    const isFeaturePoint = () => {
      return (
        feature !== null &&
        feature.g.getType() === "Point"
      )
    }

    const renderArtworkImages = () => {
      return (
        <FeatureSlider
          slides={this.getImagesData(feature)}
          onImageError={handleMissingImage}
        />
      )
    }

    const renderArtworkText = () => (
      <React.Fragment>
        <h3 className='detailArtist'>
          {feature.getProperty('artist')}
        </h3>
        <h5 className='detailAddress'>
          {feature.getProperty('address')}
        </h5>
        <h5 className='detailYear'>
          Created in {feature.getProperty('yr')}
        </h5>
        <br/>
        <p className='detailOrg'>
          <strong>Partner Organization:</strong> {feature.getProperty('partner')}
        </p>
        <p className='detailDesc'>
          <strong>Description:</strong> {feature.getProperty('description')}
        </p>
        <p className='detailWard'>
          <strong>Ward:</strong> {feature.getProperty('ward')}
        </p>
        <p className='detailPrgrm'>
          <strong>Program:</strong> {feature.getProperty('prgrm')}
        </p>
      </React.Fragment>
    )

    const renderArtworkDetails = () => {
      return (
        <div>
          <div className="detailSlideshow" aria-label="Images of the artwork">
            { renderArtworkImages() }
          </div>
          <div id="detailText">
            { renderArtworkText() }
          </div>
        </div>
      )
    }

    const renderWardDetails = () => {
      return (
        <div>
          <h3 className='detailWard'>
            Ward {feature.getProperty('AREA_L_CD')} <br/>
            {feature.getProperty('AREA_NAME')}
          </h3>
        </div>
      )
    }

    return (
      <div className="detailView">
        { isFeaturePoint() ? renderArtworkDetails() : renderWardDetails() }
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
    oldSelected: 1
  }

  getFeatureById = (featureId) => {
    return this.map.data.getFeatureById(featureId)
  }

  render() {
    return <div id='map' ref="map"></div>
  }

  componentDidMount() {
    // create the map, marker and infoWindow after the component has
    // been rendered because we need to manipulate the DOM for Google =(
    this.map = this.createMap();
    this.state.map = this.map;
    this.map.data.loadGeoJson('geojson/ftrs.json', { idPropertyName: 'uid' })
    this.map.data.loadGeoJson('geojson/wards.json', { idPropertyName: 'AREA_ID' })

    this.map.data.addListener('click', (e)=> this.handleFtrClick(e));
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
    console.log(e)
    if (e.feature && e.feature.g.getType() === "Point") {
      var prgrm = e.feature.getProperty('prgrm');
      if (prgrm !== "Partnership Program" && prgrm !==  "Outside the Box" && prgrm !==  "StART Support"){
        e.feature.setProperty('prgrm', "Other");
      };
      if (this.state.oldSelected == 1){
        this.map.data.revertStyle(this.state.oldSelected);
      } else if (this.state.oldSelected.g.getType() === "Point"){
        this.map.data.revertStyle(this.state.oldSelected);
      } else if (this.state.oldSelected.g.getType() === "MultiPolygon") {
        this.map.data.overrideStyle(this.state.oldSelected, {
          visible: true,
          fillColor: 'DarkGray',
          strokeColor: "Gray",
          strokeWeight: 2,
        });
      }

      // TODO: #ask whether this feels important
      //this.filterMap(yrs, wrds, prgrms);
      this.setState({
        oldSelected: e.feature
      });
      this.map.data.overrideStyle(e.feature, {
        icon: constants.ICONS_LRG[prgrm].icon
      });
      console.log("first")
      console.log(e)
      this.props.onFeatureMapClick(e.feature);


    } else if (e.g && e.g.getType() === "Point") { //for zooming in on a point when a tile in the list is clicked
      var prgrm = e.getProperty('prgrm');
      if (prgrm !== "Partnership Program" && prgrm !==  "Outside the Box" && prgrm !==  "StART Support"){
        e.feature.setProperty('prgrm', "Other");
      };
      this.map.data.revertStyle(this.state.oldSelected);
      this.setState({
        oldSelected: e
      });

      this.map.data.overrideStyle(e, {
        icon: constants.ICONS_LRG[prgrm].icon
      });
      this.map.panTo(e.getGeometry().g)
      this.map.setZoom(constants.MAP_ZOOM_LEVEL.FEATURE);
      return;
    }  else {
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
    /** Boolean indicating whether list view is shown. (isListView) */
    listView: true,
    /** Full object representing active artwork. */
    activeFeature:{},
    /** Keep track of whether any filters are applied. */
    isFiltered: false,
    /** Array of year OptionTypes to filter features by. */
    years: constants.YEAR_OPTS,
    /** Array of ward OptionTypes to filter features by. */
    wards: constants.WARD_OPTS,
    /** Array of program OptionTypes to filter features by. */
    programs: constants.PROGRAM_OPTS,
    /** */
    isMobileView: window.innerWidth <= 1024,
    /** */
    detailViewMobile: false,
    /** */
    filterViewMobile: false,
    /** */
    listViewMobile: false,
    /** Boolean controlling whether to show ward layer on map. */
    showWardLayer: false,
    /** Boolean controlling whether to show splash popup. */
    showSplash: true,
    /** Integer controlling which sort method for all feature lists. (sortType) */
    sortType: 'artist-asc',
  }

  componentDidMount(){
    this.fetchFeatures();
    if (this.state.isMobileView) {
      this.refs.mapControl.prepareMapMobile();
    }
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
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
      detailViewMobile: true
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
      () => {this.refs.mapControl.showWardLayer(this.state.showWardLayer)}
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
    this.setState({
      listView: false,
      activeFeature: feature,
    });
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
      listView: false,
      activeFeature: featureData,
    });
    this.refs.mapControl.handleFtrClick(featureData)
    if (this.state.isMobileView){
      this.state.detailViewMobile = true
    }
  }

  handleClickBackButton = () => {
    if (this.state.detailViewMobile) {
      this.setState({
        detailViewMobile: false
      })
    } else if (this.state.filterViewMobile) {
      this.setState({
        filterViewMobile: false
      })
    } else {
      this.setState({
        listView: true
      })
    }
  }
  setMobileFilterView = (bool) => {
    this.setState({ filterViewMobile: bool });
  }
  toggleListViewMobile = () => {
    this.setState(prevState =>({listViewMobile: !prevState.listViewMobile}))
  }

  render() {
    const {
      showSplash,
      visFtrs,
      activeFeature,
      listView,
      isMobileView,
      detailViewMobile,
      filterViewMobile,
      listViewMobile,
      sortType,
    } = this.state;

    let view, mview, button;

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


    const isDesktopListView = (listView && !isMobileView)
    const isMobileMapViewInitial = (isMobileView && listView && !listViewMobile)
    const isMobileListView = (listViewMobile)
    if (isDesktopListView) {
      view = (
        <div className="nav-wrap">
          <div className="filter-wrap">
            { renderFilters() }
          </div>

          { renderListing() }
        </div>
      )

    } else if (isMobileMapViewInitial) {
      console.log("this is MobileMapViewInitial")
      mview =
        <div>
          { renderLogo() }
          <MobileListToggleButton onClick={this.toggleListViewMobile} isList={listViewMobile}/>
          <MobileFilterViewButton onClick={this.setMobileFilterView} isFiltered={this.state.isFiltered}/>

          { isMobileListView ? renderListing() : null }
        </div>

    } else if (isMobileListView) {
      mview =
        <div>
          { renderLogo() }
          <MobileListToggleButton onClick={this.toggleListViewMobile} isList={listViewMobile}/>
          <MobileFilterViewButton onClick={this.setMobileFilterView} isFiltered={this.state.isFiltered}/>

          { isMobileListView ? renderListing() : null }
        </div>

    } else if (isMobileView) {
      if (this.state.activeFeature.getProperty('img_code')) {
        let f = this.state.activeFeature.getProperty('img_code');
        let img = `${process.env.REACT_APP_IMAGE_URL_PREFIX}/${f[0]}.jpg`;

        mview = //forr pts
          <div>
            { renderLogo() }
            <MobileListToggleButton onClick={this.toggleListViewMobile} isList={listViewMobile}/>
            <MobileFilterViewButton onClick={this.setMobileFilterView} isFiltered={this.state.isFiltered}/>

            <div id="MobileMapPopUp" onClick={this.showMobileDetail}>
              <div className='popup-pic'>
                <img aria-label="Thumbnail Preview" src={img} className="list-img" onError={handleMissingImage}/>
              </div>
              <div className="popup-txt">
                <p>
                  <strong className='tileArtist'>
                    {this.state.activeFeature.getProperty('artist')}
                  </strong>
                </p>
                <p className='tileAddress'>
                  {this.state.activeFeature.getProperty('address')}
                </p>
                <p className='tileYear'>
                  Created in {this.state.activeFeature.getProperty('yr')}
                </p>
              </div>
            </div>
          </div>
      } else { //for multipolygons (wards)
        mview =
          <div>
            { renderLogo() }
            <MobileListToggleButton onClick={this.toggleListViewMobile} isList={listViewMobile}/>
            <MobileFilterViewButton onClick={this.setMobileFilterView} isFiltered={this.state.isFiltered}/>

            <div id="MobileMapPopUp" onClick={this.showMobileDetail}>
              <div className="popup-txt">
                <h5 className='detailWard'>Ward {this.state.activeFeature.getProperty('AREA_L_CD')} <br/>
                  {this.state.activeFeature.getProperty('AREA_NAME')}
                </h5>
              </div>
            </div>
          </div>
      }


    } else {
      view = <FeatureDetail feature={activeFeature} />;
      button = <BackToListViewButton onClick={this.handleClickBackButton} />
    }

    if (detailViewMobile) {
      mview =
        <div className="detailMob">
          { renderLogo('logo-wrap-detail-mobile') }
          <BackToListViewButton onClick={this.handleClickBackButton} />
          <FeatureDetail feature={activeFeature}/>
        </div>
    } else if (filterViewMobile) {
      mview =
        <div className="filter-wrap">
          <BackToListViewButton onClick={this.handleClickBackButton} />
          { renderFilters() }
        </div>
    }
    return (
      <div className="parent">
        { showSplash ? <Splash onButtonClick={this.closeSplash} isMobile={isMobileView} /> : null }
        <BetaBanner mobile={isMobileView}/>
        <div id="theMap">
          <GMap onFeatureMapClick={this.handleMapClick} ftr={activeFeature} ref="mapControl" />
        </div>
        <GeolocateButton onClick={this.handleGeolocate}/>

        <div id="nav">
          { renderLogo("logo") }
          {button}
          {view}
        </div>
        {mview}
      </div>
    )
  }
}
