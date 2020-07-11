import React from 'react';
import ReactGA from 'react-ga';
import sort from 'fast-sort';
import runtimeEnv from '@mars/heroku-js-runtime-env';

import BetaBanner from "./BetaBanner";
import Splash from "./Splash";
import YearDropdown from "./YearDropdown";
import WardDropdown from "./WardDropdown";
import ProgramDropdown from "./ProgramDropdown";
import WardToggle from "./WardToggle";
import SortDropdown from "./SortDropdown";
import FeatureDetail from "./FeatureDetail";
import FeatureList from "./FeatureList";
import InteractiveMap from "./InteractiveMap";
import MobileMapPopup from "./MobileMapPopup";

import {
  BackToListViewButton,
  MobileListToggleButton,
  MobileFilterViewButton,
  GeolocateButton,
} from "./Buttons";

import * as constants from "../constants";

import logo from '../assets/img/logo.svg';

import 'bootstrap/dist/css/bootstrap.min.css'; // Must come first.
import 'simplebar/dist/simplebar.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../assets/scss/App.scss';

const env = runtimeEnv()


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
    showSplash: false,
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
    const isArtwork = (feature) => (
      feature.geometry &&
      feature.geometry.type === 'Point'
    )

    fetch('geojson/ftrs.json')
      .then(response => response.json())
      .then(json => {
        const visFtrs = json.features.map(f => {
          if (!isArtwork(f)) return null
          return f.properties
        }).filter(Boolean)
        this.setState({ visFtrs },
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
    this.refs.mapControl.handleFeatureClick(featureData)
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
      <header className={wrapperClass}>
        <img alt="City of Toronto logo" aria-label="Logo" src={logo}/>
        <div aria-hidden={true} className="logo">StreetARToronto</div>
        <div style={{ opacity: 0, height: 0, margin: 0, padding: 0 }} className="logo">Street Art Toronto</div>
      </header>
    )

    const renderFilters = () => (
      <form aria-label="Filter artworks">
        <label htmlFor="year">Filter by year</label>
        <YearDropdown onSelect={this.handleSelectYears} selected={this.state.years}/>

        <label htmlFor="ward">Filter by ward</label>
        <WardDropdown onSelect={this.handleSelectWards} selected={this.state.wards}/>

        <label htmlFor="program">Filter by program</label>
        <ProgramDropdown onSelect={this.handleSelectPrograms} selected={this.state.programs}/>

        <label htmlFor="sort">Sort by</label>
        <SortDropdown onSelect={this.setSortType} sortType={sortType} />

        <label id="ward-layer-label">Ward layer</label>
        <WardToggle onClick={this.toggleWardLayer} showWardLayer={this.state.showWardLayer} />

      </form>
    )

    const renderListing = () => (
      <div id={ isMobileView ? "list-wrap-mobile" : "list-wrap" }>
        <p id="listSum">{visFtrs.length} Results</p>
        <FeatureList features={visFtrs} onItemClick={this.handleFeatureListItemClick} />
      </div>
    )


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

              <MobileMapPopup
                onClick={this.showMobileDetail}
                activeFeature={activeFeature}
              />
            </React.Fragment>
          )
      }
    }

    return (
      <div className="parent">
        { showSplash ? <Splash onButtonClick={this.closeSplash} isMobile={isMobileView} /> : null }
        <BetaBanner isMobile={isMobileView}/>
        <main>
          <InteractiveMap onFeatureMapClick={this.handleMapClick} ref="mapControl" />
          <GeolocateButton onClick={this.handleGeolocate}/>
          <div id="nav">
            { renderLogo("logo") }
            { isMobileView ? null : renderDesktopView(viewType) }
          </div>
          { isMobileView ? renderMobileView(viewType) : null }
        </main>
      </div>
    )
  }
}
