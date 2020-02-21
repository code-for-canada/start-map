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
  ToggleViewButton,
  MobileFilterViewButton,
  GeolocateButton,
} from "./Buttons";

import * as constants from "../constants";

import placeholder from '../assets/placeholder.jpg';

let map
let li

const yroptions = constants.YEAR_OPTS;
let yrs = yroptions;

const wrdoptions = constants.WARD_OPTS;
let wrds = wrdoptions;

const prgrmoptions = constants.PROGRAM_OPTS;
let prgrms = prgrmoptions;

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

    window.google.maps.event.addListener(this.map.data, 'click', (e)=> this.handleFtrClick(e));
  }

  // clean up event listeners when component unmounts
  componentDidUnMount() {
    window.google.maps.event.clearListeners(map, 'zoom_changed')
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

  filterMap(yrs, wrds, prgrms) {
    li = []
    //this.map.data.revertStyle();

    const m = this.map.data
    this.map.data.forEach(function(feature) {
      let keep1 = false;
      let keep2 = false;
      let keep3 = false;

      for (let i = 0; i < yrs.length; i++) {
        if (feature.getProperty('yr') && feature.getProperty('yr').toString() === yrs[i].value.toString()) {
          keep1 = true;
        }
      }
      for (let i = 0; i < wrds.length; i++) {
        if (feature.getProperty('ward') && feature.getProperty('ward').toString() === wrds[i].value.toString()) {
          keep2 = true;
        }
      }
      for (let i = 0; i < prgrms.length; i++) {
        if (feature.getProperty('prgrm') && feature.getProperty('prgrm').toString() === prgrms[i].value.toString()) {
          keep3 = true;
        }
      }
      let geo = feature.getGeometry();
      if (geo && geo.getType() && geo.getType() === 'Point') {
        if (keep1 && keep2 && keep3) {
          m.overrideStyle(feature, {
            visible: true
          });
          let l = { 'key': feature.getProperty('uid').toString(),
            "uid": feature.getProperty('uid'),
            "artist": feature.getProperty('artist'),
            'yr': feature.getProperty('yr'),
            'address': feature.getProperty('address'),
            "img_code": feature.getProperty("img_code")}
          li.push(l);
        } else{
          m.overrideStyle(feature, {
            visible: false
          });
        }
      }
    })
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
          strokeWeight: 2
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
      let l = e.feature.getProperty('uid');
      this.props.onFeatureMapClick(l, e.feature);


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
        strokeWeight: 2
      });
    }

    this.setState({
      oldSelected: e.feature
    });
    let l = e.feature.getProperty('AREA_ID');
    this.props.onFeatureMapClick(l, e.feature);
    this.map.data.overrideStyle(e.feature, {
      fillColor: 'LightBlue',
      strokeColor: "MidnightBlue",
      strokeWeight: 3
    });
  };

  geolocation(){
    const m = this.map
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        m.setCenter(pos);
        m.setZoom(constants.MAP_ZOOM_LEVEL.FEATURE);
      }, function() {
        handleLocationError(true, m.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, m.getCenter());
    }

    function handleLocationError(browserHasGeolocation, pos) {

    }
  }

  mobileMap() {
    //this.map.data.setStyle({icon: '/marker-3-xl.png',visible: true})
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
    this.map.setOptions({zoomControl:false, streetViewControl:false})
  }

  desktopMap() {
    //this.map.data.setStyle({icon: '/marker-3-l.png',visible: true})

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
    this.map.setOptions({zoomControl:true, streetViewControl:true})
  }
  resetMap() {
    this.map.panTo(constants.DEFAULT_MAP_CENTER);
    this.map.setZoom(constants.MAP_ZOOM_LEVEL.DEFAULT);
  }
  wardLayer(bool){
    const m = this.map.data;
    if (!bool) {
      this.map.data.forEach(function(feature){
        var geo = feature.getGeometry();
        var type = ""
        if (geo) {
          type = geo.getType();
        }
        if (type === "MultiPolygon") {
          m.overrideStyle(feature, {
            visible: true
          });
        }
      })

    }
    else {
      this.map.data.forEach(function(feature){
        var geo = feature.getGeometry();
        var type = ""
        if (geo) {
          type = geo.getType();
        }
        if (type === "MultiPolygon") {
          m.overrideStyle(feature, {
            visible: false
          });
        }
      })

    }
  }
}

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.seeFilterViewMobile = this.seeFilterViewMobile.bind(this);
    this.seeListViewMobile = this.seeListViewMobile.bind(this);
    this.yearsFilter = this.yearsFilter.bind(this);
    this.wardsFilter = this.wardsFilter.bind(this);
    this.programsFilter = this.programsFilter.bind(this);
    this.wardLayer = this.wardLayer.bind(this);
    this.triggerGeo = this.triggerGeo.bind(this);
    this.closeSplash = this.closeSplash.bind(this);
    this.state = {
      /** Array of visible feature points in maps and lists. (visibleFeatures) */
      visFtrs: [],
      /** Boolean indicating whether list view is shown. (isListView) */
      listView: true,
      /** Integer representing ID of active artwork. (remove?) */
      //selected: 4,
      /** Full object representing active artwork. (activeFeature) */
      ftr:{},
      /** Keep track of whether any filters are applied. */
      isFiltered: false,
      /** Array of year OptionTypes to filter features by. */
      years: yrs,
      /** Array of ward OptionTypes to filter features by. */
      wards: wrds,
      /** Array of program OptionTypes to filter features by. */
      programs: prgrms,
      /** */
      isMobileView: window.innerWidth <= 1024,
      /** */
      detailViewMobile: false,
      /** */
      filterViewMobile: false,
      /** */
      listViewMobile: false,
      /** Boolean controlling whether to show ward layer on map. (showWardLayer) */
      wardLayer: false,
      /** Boolean controlling whether to show splash popup. */
      showSplash: true,
      /** Integer controlling which sort method for all feature lists. (sortType) */
      sortType: 'artist-asc',
    }
  }
  componentDidMount(){
    this.fetchFeatures();
    if (this.state.isMobileView) {
      this.refs.mapControl.mobileMap();
    }
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
    this.sortList()
  }

  fetchFeatures() {
    fetch('geojson/ftrs.json')
      .then(response => response.json())
      .then(json => {
        this.setState({
          visFtrs: json.features.map(f => f.properties)
        });
      });
  }

  resize() {
    this.setState({
      isMobileView: window.innerWidth <= 1024
    });
    if (this.state.isMobileView) {
      this.refs.mapControl.mobileMap();

    } else {
      this.refs.mapControl.desktopMap();
    }
  }
  closeSplash = () => {
    this.setState({
      showSplash: false
    })
  }
  seeDetail = () =>{
    this.setState({
      detailViewMobile: true
    });
  }
  triggerFilterMap(yrs, wrds, prgrms) {
    this.refs.mapControl.filterMap(yrs, wrds, prgrms);
    this.refs.mapControl.resetMap();
    this.setState({
      visFtrs:li
    });
    this.sortList();

  }
  yearsFilter(selected) {
    this.setState({
      years: selected
    })
    this.triggerFilterMap(selected, this.state.wards, this.state.programs)
    this.checkFiltered(selected, this.state.wards, this.state.programs)
    this.sortList();
  }
  wardsFilter(selected) {
    this.setState({
      wards: selected
    })
    this.triggerFilterMap(this.state.years, selected, this.state.programs)
    this.checkFiltered(this.state.years, selected, this.state.programs)
    this.sortList();
  }
  programsFilter(selected) {
    this.setState({
      programs: selected
    })
    this.triggerFilterMap(this.state.years, this.state.wards, selected)
    this.checkFiltered(this.state.years, this.state.wards, selected)
    this.sortList();
  }

  checkFiltered (yrs, wrds, prgrms) {
    if (yrs.length < yroptions.length || wrds.length < wrdoptions.length || prgrms.length < prgrmoptions.length){
      this.setState({
        filtered:true
      });
    }
    else {
      this.setState({
        filtered:false
      });
    }
  }
  wardLayer(bool) {
    this.setState(prevState =>({wardLayer: !prevState.wardLayer}))
    this.refs.mapControl.wardLayer(bool);

  }

  setSortMethod = (sortType) => {
    // Sort the list after setting state.
    this.setState({ sortType: sortType }, this.sortList)
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
  triggerGeo(){
    this.refs.mapControl.geolocation();
  }

  handleMapClick = (selected, ftr) => {
    console.log("TriggerMapClick event!")
    console.log(selected)
    console.log(ftr)
    this.setState({
      listView: false,
      ftr: ftr,
      selected: selected
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
      ftr: featureData,
      selected: featureId
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
  seeFilterViewMobile(bool) {
    this.setState({
      filterViewMobile: bool
    });
  }
  seeListViewMobile(bool) {
    this.setState(prevState =>({listViewMobile:!prevState.listViewMobile}))
  }

  render() {
    const listView = this.state.listView;
    const visFtrs = this.state.visFtrs;
    const ftr = this.state.ftr;
    const isMobileView = this.state.isMobileView;
    const detailViewMobile = this.state.detailViewMobile;
    const filterViewMobile = this.state.filterViewMobile;
    const listViewMobile = this.state.listViewMobile;
    const { showSplash } = this.state;
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
        <YearDropdown yrsFilter={this.yearsFilter} selected={this.state.years}/>

        <p>Filter by ward</p>
        <WardDropdown wrdsFilter={this.wardsFilter} selected={this.state.wards}/>

        <p>Filter by program</p>
        <ProgramDropdown prgrmFilter={this.programsFilter} selected={this.state.programs}/>

        <p>Ward layer</p>
        <WardToggle click={this.wardLayer} state={this.state.wardLayer} />
      </React.Fragment>
    )

    if (listView && !isMobileView) {
      view = (
        <div className="nav-wrap">
          <div className="filter-wrap">
            { renderFilters() }
          </div>
          <div id="list-wrap">
            <p id="listSum">{visFtrs.length} Results</p>
            <p id="sortBy">Sort by</p>
            <SortDropdown setSortMethod={this.setSortMethod} />
            <FeatureList features={visFtrs} onItemClick={this.handleFeatureListItemClick} />
          </div>
        </div>
      )

    } else if (isMobileView && listView && !listViewMobile) {
      mview =
        <div>
          { renderLogo() }
          <ToggleViewButton click={this.seeListViewMobile} state={listViewMobile}/>
          <MobileFilterViewButton onClick={this.seeFilterViewMobile} isFiltered={this.state.isFiltered}/>
        </div>
    } else if (listViewMobile) {
      mview =
        <div>
          { renderLogo() }
          <ToggleViewButton click={this.seeListViewMobile} state={listViewMobile}/>
          <MobileFilterViewButton onClick={this.seeFilterViewMobile} isFiltered={this.state.isFiltered}/>

          <div id="list-wrap-mobile">
            <p id="listSum">{visFtrs.length} Results</p>
            <p id="sortBy">Sort by</p>
            <SortDropdown setSortMethod={this.setSortMethod} />
            <FeatureList features={visFtrs} onItemClick={this.handleFeatureListItemClick} />
          </div>
        </div>
    } else if (isMobileView) {
      if (this.state.ftr.getProperty('img_code')) {
        let f = this.state.ftr.getProperty('img_code');
        let img = `${process.env.REACT_APP_IMAGE_URL_PREFIX}/${f[0]}.jpg`;

        mview = //forr pts
          <div>
            { renderLogo() }
            <ToggleViewButton click={this.seeListViewMobile} state={listViewMobile}/>
            <MobileFilterViewButton onClick={this.seeFilterViewMobile} isFiltered={this.state.isFiltered}/>

            <div id="MobileMapPopUp" onClick={this.seeDetail}>
              <div className='popup-pic'>
                <img aria-label="Thumbnail Preview" src={img} className="list-img" onError={handleMissingImage}/>
              </div>
              <div className="popup-txt">
                <p>
                  <strong className='tileArtist'>
                    {this.state.ftr.getProperty('artist')}
                  </strong>
                </p>
                <p className='tileAddress'>
                  {this.state.ftr.getProperty('address')}
                </p>
                <p className='tileYear'>
                  Created in {this.state.ftr.getProperty('yr')}
                </p>
              </div>
            </div>
          </div>
      } else { //for multipolygons (wards)
        mview =
          <div>
            { renderLogo() }
            <ToggleViewButton click={this.seeListViewMobile} state={listViewMobile}/>
            <MobileFilterViewButton onClick={this.seeFilterViewMobile} isFiltered={this.state.isFiltered}/>

            <div id="MobileMapPopUp" onClick={this.seeDetail}>
              <div className="popup-txt">
                <h5 className='detailWard'>Ward {this.state.ftr.getProperty('AREA_L_CD')} <br/>
                  {this.state.ftr.getProperty('AREA_NAME')}
                </h5>
              </div>
            </div>
          </div>
      }


    } else {
      view = <FeatureDetail feature={ftr} />;
      button = <BackToListViewButton onClick={this.handleClickBackButton} />
    }

    if (detailViewMobile) {
      mview =
        <div className="detailMob">
          { renderLogo('logo-wrap-detail-mobile') }
          <BackToListViewButton onClick={this.handleClickBackButton} />
          <FeatureDetail feature={ftr}/>
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
          <GMap onFeatureMapClick={this.handleMapClick} ftr={ftr} ref="mapControl" />
        </div>
        <GeolocateButton click={this.triggerGeo}/>

        <div id="nav">
          <div className="logo">
            <img aria-label="Logo" className="logo" src={logo}/>
            <h3 className="logo">StreetARToronto</h3>
            {button}
          </div>
          {view}
        </div>
        {mview}
      </div>
    )
  }
}
