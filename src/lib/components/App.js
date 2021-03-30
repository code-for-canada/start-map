import React, { lazy, Suspense } from 'react';
import ReactGA from 'react-ga';
import sort from 'fast-sort';
import runtimeEnv from '@mars/heroku-js-runtime-env';
import { forceCheck } from 'react-lazyload';
import * as _ from 'lodash';

import BetaBanner from "./BetaBanner";
import Splash from "./Splash";
import InteractiveMap from "./InteractiveMap";
import Logo from "./Logo";

import * as constants from "../constants";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../assets/scss/main.scss';

const env = runtimeEnv()
const FeatureDetail = lazy(() => import('./FeatureDetail'));
const FeatureList = lazy(() => import('./FeatureList'));
const Filters = lazy(() => import('./Filters'));
const Header = lazy(() => import('./Header'));
const Footer = lazy(() => import('./Footer'));

export default class App extends React.Component {

  state = {
    /** Array of all artwork objects that may show in maps and lists. */
    allFeatures: [],
    /** Array of visible artwork IDs in maps and lists. */
    visibleFeatureIds: [],
    /** The type of view.
     * Options: list, detail, map, filter
     * Last two only display differently on mobile. */
    viewType: "map",
    /** Integer representing active artwork ID. */
    activeFeatureId: null,
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
    if ((env.REACT_APP_GOOGLE_ANALYTICS_ID)) {
      ReactGA.initialize(env.REACT_APP_GOOGLE_ANALYTICS_ID);
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  }

  componentDidMount(){
    this.fetchFeatures();
    this.initReactGA();
    window.addEventListener("resize", this.resize.bind(this));
  }

  fetchFeatures() {
    const isArtwork = (feature) => (
      feature.geometry &&
      feature.geometry.type === 'Point'
    )

    fetch(this.props.featuresDataSource)
      .then(response => response.json())
      .then(json => {
        const allFeatures = json.features.map(f => {
          if (!isArtwork(f)) return null
          return f
        }).filter(Boolean)
        this.setState({ allFeatures, visibleFeatureIds: allFeatures.map(f => f.id)  },
          // Sort after first load.
          () => { this.sortList() }
        );
      });
  }

  resize() {
    this.setState({
      isMobileView: window.innerWidth <= 1024
    });
  }

  closeSplash = () => {
    this.setState({
      showSplash: false
    })
  }

  openSplash = () => {
    this.setState({
      showSplash: true
    })
  }

  setVisibleFeatureIds = (visibleFeatureIds) => {
    this.setState(
      { visibleFeatureIds },
      () => { this.sortList() }
    );
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
  filterFeatures = (activeYearOpts, activeWardOpts, activeProgramOpts) => {

    const checkForKeep = (feature, propName, activeOpts) => {
      for (let i = 0; i < activeOpts.length; i++) {
        if (feature.properties[propName] &&
          feature.properties[propName].toString() === activeOpts[i].value.toString()
        ) {
          return true;
        }
      }
      return false;
    }

    const isArtwork = (feature) => (
      feature.geometry !== null &&
      feature.geometry.type === 'Point'
    )


    const visibleFeatures = this.state.allFeatures.filter(feature => {
      if (!isArtwork(feature)) { return false }

      let keepForYear = checkForKeep(feature, 'year', activeYearOpts)
      let keepForWard = checkForKeep(feature, 'ward', activeWardOpts)
      let keepForProgram = checkForKeep(feature, 'program', activeProgramOpts)

      return keepForYear && keepForWard && keepForProgram;
    })

    this.setVisibleFeatureIds(visibleFeatures.map(f => f.id));
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
        this.filterFeatures(this.state.years, this.state.wards, this.state.programs)
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
    this.setState({ showWardLayer: !this.state.showWardLayer },
      () => {
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
        sortedList = sort(this.state.visibleFeatureIds).asc(id => _.find(this.state.allFeatures, { id }).properties?.title.toLowerCase())
        break
      case 'artist-desc':
        sortedList = sort(this.state.visibleFeatureIds).desc(id => _.find(this.state.allFeatures, { id }).properties?.title.toLowerCase())
        break
      case 'year-asc':
        sortedList = sort(this.state.visibleFeatureIds).asc(id => _.find(this.state.allFeatures, { id }).properties?.year)
        break
      case 'year-desc':
        sortedList = sort(this.state.visibleFeatureIds).desc(id => _.find(this.state.allFeatures, { id }).properties?.year)
        break
    }
    this.setState({ visibleFeatureIds: sortedList })
  }

  handleMapClick = (featureId) => {
    ReactGA.event({
      category: 'Map',
      action: 'Clicked feature',
      label: 'ward or artwork',
    })
    this.setActiveFeatureId(featureId)
  }


  setActiveFeatureId = (featureId) => {
    this.setState({
      activeFeatureId: featureId,
    });
  }


  handleCloseFeature = () => {
    const uid = this.state.allFeatures[this.state.activeFeatureId].properties.uid
    if (typeof(document) !== 'undefined') {
      const featureBtn = document.getElementById(uid)
      featureBtn.scrollIntoView()
      featureBtn.focus()
    }
    this.setState({
      activeFeatureId: null
    })
  }

  setMobileFilterView = () => {
    this.setState({ viewType: "filter" });
  }

  toggleFilters = () => {
    this.setState({ showFilters: !this.state.showFilters });
  }

  toggleListViewMobile = () => {
    this.setState(prevState =>({
      viewType: prevState.viewType === 'list' ? 'map' : 'list'
    }), () => {
      setTimeout(forceCheck, 300) // wait for animation to complete
    })
  }

  render() {
    const {
      showSplash,
      allFeatures,
      visibleFeatureIds,
      activeFeatureId,
      isMobileView,
      isFiltered,
      viewType,
      showWardLayer,
    } = this.state;

    const activeFeature = _.find(allFeatures, { id: activeFeatureId })

    return (
      <div className="parent" id="start-map">
        <BetaBanner isMobile={isMobileView}/>
        <Splash openSplash={this.openSplash} closeSplash={this.closeSplash} isMobile={isMobileView} showSplash={showSplash} />
          { isMobileView &&
            <Suspense fallback={<div className="loading" />}>
              <Header
                isMobile={isMobileView}
              />
            </Suspense>
          }
            <main className={`view-${viewType}`}>
              { isMobileView ?
                <Suspense fallback={<div className="loading" />}>
                  <FeatureList
                    isMobile={isMobileView}
                    allFeatures={allFeatures}
                    featureIds={visibleFeatureIds}
                    onItemClick={this.setActiveFeatureId}
                    activeFeature={activeFeature}
                  />
                  <FeatureDetail feature={activeFeature} onClose={this.handleCloseFeature} />
                </Suspense> :
                <div id="nav" className="shadow-depth">
                  <div className="nav-wrap">
                    <Logo />
                    <Suspense fallback={<div className="loading" />}>
                      <Filters
                        handleSelectYears={this.handleSelectYears}
                        handleSelectWards={this.handleSelectWards}
                        handleSelectPrograms={this.handleSelectPrograms}
                        setSortType={this.setSortType}
                        toggleWardLayer={this.toggleWardLayer}
                        {...this.state}
                      />
                      <FeatureList
                        isMobile={isMobileView}
                        allFeatures={allFeatures}
                        featureIds={visibleFeatureIds}
                        onItemClick={this.setActiveFeatureId}
                        activeFeature={activeFeature}
                      />
                      <FeatureDetail feature={activeFeature} onClose={this.handleCloseFeature} />
                    </Suspense>
                  </div>
                </div>
              }
              <InteractiveMap
                isMobile={isMobileView}
                onFeatureMapClick={this.handleMapClick}
                allFeatures={allFeatures}
                visibleFeatureIds={visibleFeatureIds}
                activeFeature={activeFeature}
                showWardLayer={showWardLayer}
                googleApiKey={this.props.googleApiKey}
                wardsDataSource={this.props.wardsDataSource}
              />
            </main>
          { isMobileView &&
            <Suspense fallback={<div className="loading" />}>
              <Footer
                isMobile={isMobileView}
                isFiltered={isFiltered}
                toggleListViewMobile={this.toggleListViewMobile}
                setMobileFilterView={this.setMobileFilterView}
                viewType={viewType}
                toggleFilters={this.toggleFilters}
                showFilters={this.state.showFilters}
                handleSelectYears={this.handleSelectYears}
                handleSelectWards={this.handleSelectWards}
                handleSelectPrograms={this.handleSelectPrograms}
                toggleWardLayer={this.toggleWardLayer}
                setSortType={this.setSortType}
                {...this.state}
              />
            </Suspense>
          }
      </div>
    )
  }
}
