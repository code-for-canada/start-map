import React from 'react';
// See: https://create-react-app.dev/docs/adding-bootstrap/
import 'bootstrap/dist/css/bootstrap.min.css'; // Must come first.
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LazyLoad from 'react-lazyload';
// TODO: Check into whether simplebar-react import was required.
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
import DynamicSlides from "./DynamicSlides";
import {
  BackToListViewButton,
  ToggleViewButton,
  MobileFilterViewButton,
  GeolocateButton,
} from "./Buttons";

import * as constants from "../constants";

import markerBlue from '../assets/marker-blue.svg';
import markerRed from '../assets/marker-red.svg';
import markerGreen from '../assets/marker-green.svg';
import markerYellow from '../assets/marker-yellow.svg';
import markerBlueL from '../assets/marker-blue-l.svg';
import markerRedL from '../assets/marker-red-l.svg';
import markerGreenL from '../assets/marker-green-l.svg';
import markerYellowL from '../assets/marker-yellow-l.svg';
import placeholder from '../assets/placeholder.jpg';

let map
let li
let mapFtr = 0

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

  handleClick = (e) => {
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
class Detail extends React.Component {
  static propTypes = {
    ftr: PropTypes.any.isRequired,
    click: PropTypes.func,
    uid: PropTypes.number,
  }

  state = {
    // TODO: is this right?
    ftr: this.props.ftr.getProperty('uid')
  }

  getImgCodes = (sel) => {
    let imgs = [];
    if (sel.g && sel.g.getType() === "Point") {
      let f = sel.getProperty('img_code')
      for (var i = 0; i < f.length; i++) {
        imgs.push({
          key: sel.getProperty('uid')+ "-" + i,
          img: `${process.env.REACT_APP_IMAGE_URL_PREFIX}/${f[i]}.jpg`,
          alt: "Photo of artwork.",
        })
      }
      if (f.length === 0) {
        imgs.push({
          key: sel.getProperty('uid'),
          img: placeholder,
          alt: "Image not available.",
        })
      }
    }
    return imgs;
  }

  render() {
    const { uid, ftr } = this.props;

    const featureExists = () => {
      return (
        ftr !== null &&
        ftr.g.getType() === "Point"
      )
    }

    const renderFeatureImages = () => {
      return (
        <DynamicSlides
          slides={this.getImgCodes(ftr)}
          onImageError={handleMissingImage}
        />
      )
    }

    const renderFeatureText = () => (
      <React.Fragment>
        <h3 className='detailArtist'>
          {ftr.getProperty('artist')}
        </h3>
        <h5 className='detailAddress'>
          {ftr.getProperty('address')}
        </h5>
        <h5 className='detailYear'>
          Created in {ftr.getProperty('yr')}
        </h5>
        <br/>
        <p className='detailOrg'>
          <strong>Partner Organization:</strong> {ftr.getProperty('partner')}
        </p>
        <p className='detailDesc'>
          <strong>Description:</strong> {ftr.getProperty('description')}
        </p>
        <p className='detailWard'>
          <strong>Ward:</strong> {ftr.getProperty('ward')}
        </p>
        <p className='detailPrgrm'>
          <strong>Program:</strong> {ftr.getProperty('prgrm')}
        </p>
      </React.Fragment>
    )

    const renderFeatureDetails = () => {
      return (
        <div>
          <div className="detailSlideshow" aria-label="Images of the artwork">
            { renderFeatureImages() }
          </div>
          <div id="detailText">
            { renderFeatureText() }
          </div>
        </div>
      )
    }

    const renderWardDetails = () => {
      return (
        <div>
          <h3 className='detailWard'>
            Ward {ftr.getProperty('AREA_L_CD')} <br/>
            {ftr.getProperty('AREA_NAME')}
          </h3>
        </div>
      )
    }

    return (
      <div className="detailView">
        { featureExists() ? renderFeatureDetails() : renderWardDetails() }
      </div>
    )
  }
}
var icons = {
  "Partnership Program": {
    icon: markerBlue
  },
  "Outside the Box": {
    icon: markerRed
  },
  "StART Support": {
    icon: markerGreen
  },
  "Other": {
    icon: markerYellow
  }
};
var iconsLarge = {
  "Partnership Program": {
    icon: markerBlueL
  },
  "Outside the Box": {
    icon: markerRedL
  },
  "StART Support": {
    icon: markerGreenL
  },
  "Other": {
    icon: markerYellowL
  }
};
class GMap extends React.Component {
  static propTypes = {
    onFeatureClick: PropTypes.func,
    ftr: PropTypes.object,
  }

  state = {
    oldSelected: 1
  }

  getFtr = (uid) => {
    return this.map.data.getFeatureById(uid)
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

    // this.map.data.setStyle(function(feature){
    //     var geo = feature.getGeometry();

    //     var type = ""
    //     if (geo) {
    //         type = geo.getType();
    //     }

    //     if (type === "MultiPolygon") {
    //         return({
    //             visible: false,
    //             fillColor: 'Navy',
    //             strokeWeight: 2
    //         });
    //     } else {
    //         return ({
    //             icon:'/marker-3-l.png',
    //             visible: true,
    //         });
    //     }

    //})
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
      } else {

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
        icon: iconsLarge[prgrm].icon
      });
      let l = e.feature.getProperty('uid');
      {
        this.props.onFeatureClick(l, e.feature);
      }


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
        icon: iconsLarge[prgrm].icon
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
    this.props.onFeatureClick(l, e.feature);
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
          icon: icons[prgrm].icon,
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
          icon: icons[prgrm].icon,
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
    this.triggerMapClick = this.triggerMapClick.bind(this);
    this.seeFilterViewMobile = this.seeFilterViewMobile.bind(this);
    this.seeListViewMobile = this.seeListViewMobile.bind(this);
    this.getImgId = this.getImgId.bind(this);
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
      /** */
      filtered: false,
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
      /** Boolean controlling whether to show splash popup. (showSplashModal) */
      splashVis: true,
      /** Integer controlling which sort method for all feature lists. (sortType) */
      sortType: 'artist-asc',
    }
  }
  componentDidMount(){
    this.fetchFeatures();
    if (this.state.isMobileView) {
      this.refs.filter.mobileMap();
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
      this.refs.filter.mobileMap();

    } else {
      this.refs.filter.desktopMap();
    }
  }
  closeSplash = () => {
    this.setState({
      splashVis: false
    })
  }
  seeDetail = () =>{
    this.setState({
      detailViewMobile: true
    });
  }
  triggerFilterMap(yrs, wrds, prgrms) {
    this.refs.filter.filterMap(yrs, wrds, prgrms);
    this.refs.filter.resetMap();
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
    this.refs.filter.wardLayer(bool);

  }

  setSortMethod = (sortType) => {
    this.setState({
      sortType: sortType,
    })
    this.sortList()
  }

  sortList = () => {
    switch(this.state.sortType) {
      case 'artist-asc':
      default:
        sort(this.state.visFtrs).asc(u => u.artist)
        break
      case 'artist-desc':
        sort(this.state.visFtrs).desc(u => u.artist)
        break
      case 'year-asc':
        sort(this.state.visFtrs).asc(u => u.yr)
        break
      case 'year-desc':
        sort(this.state.visFtrs).desc(u => u.yr)
        break
    }

  }
  triggerGeo(){
    this.refs.filter.geolocation();
  }
  triggerMapClick(selected, ftr) {
    console.log("TriggerMapClick event!")
    console.log(selected)
    console.log(ftr)
    this.setState({
      listView: false,
      ftr: ftr,
      selected: selected
    });

    // if (this.state.ftr.g.getType() === "MultiPolygon") {
    //     let label = this.state.ftr.getProperty('AREA_S_CD') + "–" + this.state.ftr.getProperty('AREA_NAME');
    //     wrds = [{value:this.state.ftr.getProperty('AREA_S_CD'),
    //     label: label}];
    //     this.setState({
    //         wards: wrds
    //     });
    //     this.triggerFilterMap;
    // }
  }
  handleFeatureListItemClick = (selected) => {
    let ftr = this.refs.filter.getFtr(selected)

    this.setState({
      listView: false,
      ftr: ftr,
      selected: selected
    });
    this.refs.filter.handleFtrClick(this.refs.filter.getFtr(selected))
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
  getImgId(uid){
    let ftr = this.refs.filter.getFtr(uid);
    let imgcode =  ftr.getProperty('img_code');
    return imgcode;
  }
  // TODO: #ask what this is used for.
  toggleFullScreen() {
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
    var fullscreenElement = doc.fullscreenElement || doc.mozFullScreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement;

    if (!fullscreenElement) {
      requestFullScreen.call(docEl);
    } else {
      cancelFullScreen.call(doc);
    }
  }


  render() {
    const listView = this.state.listView;
    const visFtrs = this.state.visFtrs;
    const ftr = this.state.ftr;
    const isMobileView = this.state.isMobileView;
    const detailViewMobile = this.state.detailViewMobile;
    const filterViewMobile = this.state.filterViewMobile;
    const listViewMobile = this.state.listViewMobile;
    const splashVis = this.state.splashVis;
    const sortType = this.state.sortType;
    let view, mview, button, splash;

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

    if (splashVis) {
      splash = <Splash click={this.closeSplash} mobile={isMobileView}/>
    }

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
          <ToggleViewButton click={this.seeListViewMobile} state={listViewMobile}/>
          <div id="filter">
            <MobileFilterViewButton onClick={this.seeFilterViewMobile} isFiltered={this.state.filtered}/>
          </div>
        </div>
    } else if (listViewMobile) {
      mview =
        <div>
          <ToggleViewButton click={this.seeListViewMobile} state={listViewMobile}/>
          { renderLogo() }
          <div id="filter">
            <MobileFilterViewButton onClick={this.seeFilterViewMobile} isFiltered={this.state.filtered}/>
          </div>

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
            <div id="filter">
              <MobileFilterViewButton onClick={this.seeFilterViewMobile} isFiltered={this.state.filtered}/>
            </div>

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
            <div id="filter">
              <MobileFilterViewButton onClick={this.seeFilterViewMobile} isFiltered={this.state.filtered}/>
            </div>

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
      view = <Detail ftr={ftr} />;
      button = <BackToListViewButton onClick={this.handleClickBackButton} />
    }

    if (detailViewMobile) {
      mview =
        <div className="detailMob">
          { renderLogo('logo-wrap-detail-mobile') }
          <BackToListViewButton onClick={this.handleClickBackButton} />
          <Detail ftr={ftr}/>
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
        {splash}
        <BetaBanner mobile={isMobileView}/>
        <div id="theMap">
          <GMap onFeatureClick={this.triggerMapClick} ftr={ftr} ref="filter"/>
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
