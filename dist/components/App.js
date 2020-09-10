"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactGa = _interopRequireDefault(require("react-ga"));

var _fastSort = _interopRequireDefault(require("fast-sort"));

var _herokuJsRuntimeEnv = _interopRequireDefault(require("@mars/heroku-js-runtime-env"));

var _reactLazyload = require("react-lazyload");

var _BetaBanner = _interopRequireDefault(require("./BetaBanner"));

var _Splash = _interopRequireDefault(require("./Splash"));

var _InteractiveMap = _interopRequireDefault(require("./InteractiveMap"));

var _Logo = _interopRequireDefault(require("./Logo"));

var constants = _interopRequireWildcard(require("../constants"));

require("slick-carousel/slick/slick.css");

require("slick-carousel/slick/slick-theme.css");

require("../assets/scss/main.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var env = (0, _herokuJsRuntimeEnv.default)();
var FeatureDetail = /*#__PURE__*/(0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./FeatureDetail'));
  });
});
var FeatureList = /*#__PURE__*/(0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./FeatureList'));
  });
});
var Filters = /*#__PURE__*/(0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./Filters'));
  });
});
var Header = /*#__PURE__*/(0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./Header'));
  });
});
var Footer = /*#__PURE__*/(0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./Footer'));
  });
});

var App = /*#__PURE__*/function (_React$Component) {
  _inherits(App, _React$Component);

  var _super = _createSuper(App);

  function App() {
    var _this;

    _classCallCheck(this, App);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      /** Array of visible feature points in maps and lists. (visibleFeatures) */
      allFeatures: [],
      visFtrs: [],

      /** The type of view.
       * Options: list, detail, map, filter
       * Last two only display differently on mobile. */
      viewType: "map",

      /** Full object representing active artwork. */
      activeFeature: null,

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
      sortType: 'artist-asc'
    });

    _defineProperty(_assertThisInitialized(_this), "initReactGA", function () {
      _reactGa.default.initialize(env.REACT_APP_GOOGLE_ANALYTICS_ID);

      _reactGa.default.pageview(window.location.pathname + window.location.search);
    });

    _defineProperty(_assertThisInitialized(_this), "closeSplash", function () {
      _this.setState({
        showSplash: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "openSplash", function () {
      _this.setState({
        showSplash: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setVisibleFeatures", function (visFtrs) {
      _this.setState({
        visFtrs: visFtrs
      }, function () {
        _this.sortList();
      });
    });

    _defineProperty(_assertThisInitialized(_this), "filterFeatures", function (activeYearOpts, activeWardOpts, activeProgramOpts) {
      var checkForKeep = function checkForKeep(feature, propName, activeOpts) {
        for (var i = 0; i < activeOpts.length; i++) {
          if (feature.properties[propName] && feature.properties[propName].toString() === activeOpts[i].value.toString()) {
            return true;
          }
        }

        return false;
      };

      var isArtwork = function isArtwork(feature) {
        return feature.geometry !== null && feature.geometry.type === 'Point';
      };

      var visibleFeatures = _this.state.allFeatures.filter(function (feature) {
        if (!isArtwork(feature)) {
          return false;
        }

        var keepForYear = checkForKeep(feature, 'yr', activeYearOpts);
        var keepForWard = checkForKeep(feature, 'ward', activeWardOpts);
        var keepForProgram = checkForKeep(feature, 'prgrm', activeProgramOpts);
        return keepForYear && keepForWard && keepForProgram;
      });

      _this.setVisibleFeatures(visibleFeatures);
    });

    _defineProperty(_assertThisInitialized(_this), "handleSelectYears", function (selectedOptions) {
      _this.handleSelected('years', selectedOptions);
    });

    _defineProperty(_assertThisInitialized(_this), "handleSelectWards", function (selectedOptions) {
      _this.handleSelected('wards', selectedOptions);
    });

    _defineProperty(_assertThisInitialized(_this), "handleSelectPrograms", function (selectedOptions) {
      _this.handleSelected('programs', selectedOptions);
    });

    _defineProperty(_assertThisInitialized(_this), "handleSelected", function (stateKey, selectedOptions) {
      _this.setState(_defineProperty({}, stateKey, selectedOptions), function () {
        _this.filterFeatures(_this.state.years, _this.state.wards, _this.state.programs);

        _this.checkFiltered(_this.state.years, _this.state.wards, _this.state.programs);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "toggleWardLayer", function () {
      _this.setState({
        showWardLayer: !_this.state.showWardLayer
      }, function () {
        _reactGa.default.event({
          category: 'Map',
          action: 'Toggle ward layer',
          label: _this.state.showWardLayer ? 'turned on' : 'turned off'
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setSortType", function (sortType) {
      // Sort the list after setting state.
      _this.setState({
        sortType: sortType
      }, function () {
        _this.sortList();
      });
    });

    _defineProperty(_assertThisInitialized(_this), "sortList", function () {
      var sortedList = [];

      switch (_this.state.sortType) {
        case 'artist-asc':
        default:
          sortedList = (0, _fastSort.default)(_this.state.visFtrs).asc(function (u) {
            return u.properties.artist ? u.properties.artist.toLowerCase() : u.properties.artist;
          });
          break;

        case 'artist-desc':
          sortedList = (0, _fastSort.default)(_this.state.visFtrs).desc(function (u) {
            return u.properties.artist ? u.properties.artist.toLowerCase() : u.properties.artist;
          });
          break;

        case 'year-asc':
          sortedList = (0, _fastSort.default)(_this.state.visFtrs).asc(function (u) {
            return u.properties.yr;
          });
          break;

        case 'year-desc':
          sortedList = (0, _fastSort.default)(_this.state.visFtrs).desc(function (u) {
            return u.properties.yr;
          });
          break;
      }

      _this.setState({
        visFtrs: sortedList
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleMapClick", function (feature) {
      _reactGa.default.event({
        category: 'Map',
        action: 'Clicked feature',
        label: 'ward or artwork'
      });

      _this.setActiveFeature(feature);
    });

    _defineProperty(_assertThisInitialized(_this), "setActiveFeature", function (feature) {
      if (typeof window !== 'undefined') {
        window.location.hash = feature.properties.uid;
      }

      _this.setState({
        activeFeature: feature
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleCloseFeature", function () {
      var uid = _this.state.activeFeature.properties.uid;

      if (typeof document !== 'undefined') {
        var featureBtn = document.getElementById(uid);
        featureBtn.scrollIntoView();
        featureBtn.focus();
      }

      _this.setState({
        activeFeature: null
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setMobileFilterView", function () {
      _this.setState({
        viewType: "filter"
      });
    });

    _defineProperty(_assertThisInitialized(_this), "toggleFilters", function () {
      _this.setState({
        showFilters: !_this.state.showFilters
      });
    });

    _defineProperty(_assertThisInitialized(_this), "toggleListViewMobile", function () {
      _this.setState(function (prevState) {
        return {
          viewType: prevState.viewType === 'list' ? 'map' : 'list'
        };
      }, function () {
        setTimeout(_reactLazyload.forceCheck, 300); // wait for animation to complete
      });
    });

    return _this;
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fetchFeatures();
      this.initReactGA();
      window.addEventListener("resize", this.resize.bind(this));
    }
  }, {
    key: "fetchFeatures",
    value: function fetchFeatures() {
      var _this2 = this;

      var isArtwork = function isArtwork(feature) {
        return feature.geometry && feature.geometry.type === 'Point';
      };

      fetch('geojson/ftrs.json').then(function (response) {
        return response.json();
      }).then(function (json) {
        var visFtrs = json.features.map(function (f) {
          if (!isArtwork(f)) return null;
          return f;
        }).filter(Boolean);

        _this2.setState({
          allFeatures: visFtrs,
          visFtrs: visFtrs
        }, // Sort after first load.
        function () {
          _this2.sortList();
        });
      });
    }
  }, {
    key: "resize",
    value: function resize() {
      this.setState({
        isMobileView: window.innerWidth <= 1024
      });
    }
  }, {
    key: "checkFiltered",
    value: function checkFiltered(activeYearOpts, activeWardOpts, activeProgramOpts) {
      var isFiltered = activeYearOpts.length < constants.YEAR_OPTS.length || activeWardOpts.length < constants.WARD_OPTS.length || activeProgramOpts.length < constants.PROGRAM_OPTS.length || false;
      this.setState({
        isFiltered: isFiltered
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          showSplash = _this$state.showSplash,
          visFtrs = _this$state.visFtrs,
          activeFeature = _this$state.activeFeature,
          isMobileView = _this$state.isMobileView,
          isFiltered = _this$state.isFiltered,
          viewType = _this$state.viewType,
          showWardLayer = _this$state.showWardLayer;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "parent",
        id: "start-map"
      }, /*#__PURE__*/_react.default.createElement(_BetaBanner.default, {
        isMobile: isMobileView
      }), /*#__PURE__*/_react.default.createElement(_Splash.default, {
        openSplash: this.openSplash,
        closeSplash: this.closeSplash,
        isMobile: isMobileView,
        showSplash: showSplash
      }), isMobileView && /*#__PURE__*/_react.default.createElement(_react.Suspense, {
        fallback: /*#__PURE__*/_react.default.createElement("div", {
          className: "loading"
        })
      }, /*#__PURE__*/_react.default.createElement(Header, {
        isMobile: isMobileView
      })), /*#__PURE__*/_react.default.createElement("main", {
        className: "view-".concat(viewType)
      }, isMobileView ? /*#__PURE__*/_react.default.createElement(_react.Suspense, {
        fallback: /*#__PURE__*/_react.default.createElement("div", {
          className: "loading"
        })
      }, /*#__PURE__*/_react.default.createElement(FeatureList, {
        isMobile: isMobileView,
        features: visFtrs,
        onItemClick: this.setActiveFeature,
        activeFeature: activeFeature
      }), /*#__PURE__*/_react.default.createElement(FeatureDetail, {
        feature: activeFeature,
        onClose: this.handleCloseFeature
      })) : /*#__PURE__*/_react.default.createElement("div", {
        id: "nav",
        className: "shadow-depth"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "nav-wrap"
      }, /*#__PURE__*/_react.default.createElement(_Logo.default, null), /*#__PURE__*/_react.default.createElement(_react.Suspense, {
        fallback: /*#__PURE__*/_react.default.createElement("div", {
          className: "loading"
        })
      }, /*#__PURE__*/_react.default.createElement(Filters, _extends({
        handleSelectYears: this.handleSelectYears,
        handleSelectWards: this.handleSelectWards,
        handleSelectPrograms: this.handleSelectPrograms,
        setSortType: this.setSortType,
        toggleWardLayer: this.toggleWardLayer
      }, this.state)), /*#__PURE__*/_react.default.createElement(FeatureList, {
        isMobile: isMobileView,
        features: visFtrs,
        onItemClick: this.setActiveFeature,
        activeFeature: activeFeature
      }), /*#__PURE__*/_react.default.createElement(FeatureDetail, {
        feature: activeFeature,
        onClose: this.handleCloseFeature
      })))), /*#__PURE__*/_react.default.createElement(_InteractiveMap.default, {
        isMobile: isMobileView,
        onFeatureMapClick: this.handleMapClick,
        features: visFtrs,
        activeFeature: activeFeature,
        showWardLayer: showWardLayer,
        googleApiKey: this.props.googleApiKey
      })), isMobileView && /*#__PURE__*/_react.default.createElement(_react.Suspense, {
        fallback: /*#__PURE__*/_react.default.createElement("div", {
          className: "loading"
        })
      }, /*#__PURE__*/_react.default.createElement(Footer, _extends({
        isMobile: isMobileView,
        isFiltered: isFiltered,
        toggleListViewMobile: this.toggleListViewMobile,
        setMobileFilterView: this.setMobileFilterView,
        viewType: viewType,
        toggleFilters: this.toggleFilters,
        showFilters: this.state.showFilters,
        handleSelectYears: this.handleSelectYears,
        handleSelectWards: this.handleSelectWards,
        handleSelectPrograms: this.handleSelectPrograms,
        toggleWardLayer: this.toggleWardLayer,
        setSortType: this.setSortType
      }, this.state))));
    }
  }]);

  return App;
}(_react.default.Component);

exports.default = App;