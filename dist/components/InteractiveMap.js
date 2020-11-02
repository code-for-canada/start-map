"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _googleMapsReact = require("@nomadiclabs/google-maps-react");

var constants = _interopRequireWildcard(require("../constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var MapLegend = /*#__PURE__*/(0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./MapLegend'));
  });
});
var GeolocateButton = /*#__PURE__*/(0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./GeolocateButton'));
  });
});

var InteractiveMap = /*#__PURE__*/function (_React$Component) {
  _inherits(InteractiveMap, _React$Component);

  var _super = _createSuper(InteractiveMap);

  function InteractiveMap(props) {
    var _this;

    _classCallCheck(this, InteractiveMap);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "geolocation", function () {
      var map = _this.map;

      if (navigator.geolocation && map) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var center = new this.props.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          map.panTo(center);
          map.setZoom(constants.MAP_ZOOM_LEVEL.FEATURE);
        }, function () {
          window.alert("There was a problem getting your location.");
          this.resetMap();
        });
      } else {
        // Browser doesn't support Geolocation
        window.alert("Your browser does not support geolocation.");
      }
    });

    _defineProperty(_assertThisInitialized(_this), "resetMap", function () {
      var map = _this.map;

      if (map) {
        map.panTo(constants.DEFAULT_MAP_CENTER);
        map.setZoom(constants.MAP_ZOOM_LEVEL.DEFAULT);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMapReady", function (mapProps, map) {
      _this.map = map;
      map.setOptions({
        styles: constants.MAP_STYLE_BASE,
        zoomControlOptions: {
          position: _this.props.google.maps.ControlPosition.TOP_RIGHT
        }
      });

      _this.map.data.loadGeoJson(_this.props.wardsDataSource, {
        idPropertyName: 'AREA_ID'
      });

      _this.map.data.setStyle(constants.MAP_STYLE_WARD_DEFAULT);

      _this.map.data.addListener('click', function (e) {
        return _this.handleMapClick(e);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleMapClick", function (e) {
      var feature = e.feature; // Clicking a ward feature on the map.

      if (feature.getGeometry().getType() === "MultiPolygon") {
        // Clicking on a ward mulitpolygon feature on the map.
        _this.map.data.revertStyle();

        _this.map.data.overrideStyle(feature, constants.MAP_STYLE_WARD_ACTIVE);

        var content = "Ward ".concat(feature.getProperty('AREA_S_CD'), ": ").concat(feature.getProperty('AREA_NAME'));

        if (_this.infowindow) {
          _this.infowindow.close();
        }

        _this.infowindow = new _this.props.google.maps.InfoWindow({
          content: content,
          position: e.latLng
        });

        _this.infowindow.open(_this.map);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "updateWardLayerVisibility", function () {
      _this.map.data.setStyle(_objectSpread(_objectSpread({}, constants.MAP_STYLE_WARD_DEFAULT), {}, {
        visible: _this.props.showWardLayer
      }));

      if (_this.infowindow) {
        _this.infowindow.close();
      }
    });

    _this.state = {
      prevActiveFeature: {},
      features: _this.props.features,
      wards: {}
    };
    _this.mapRef = /*#__PURE__*/(0, _react.createRef)();
    _this.mapSettings = {
      className: 'map-base',
      center: constants.DEFAULT_MAP_CENTER,
      zoom: constants.MAP_ZOOM_LEVEL.DEFAULT,
      minZoom: constants.MAP_ZOOM_LEVEL.MIN,
      zoomControl: true,
      fullscreenControl: false,
      mapTypeControl: false
    };
    _this.map = null;
    _this.infowindow = null;
    return _this;
  }

  _createClass(InteractiveMap, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.features !== this.props.features) {
        this.setState({
          features: this.props.features
        });
      }

      if (prevProps.showWardLayer !== this.props.showWardLayer) {
        this.updateWardLayerVisibility();
      }

      if (!this.props.isMobile && this.props.activeFeature && prevProps.activeFeature !== this.props.activeFeature) {
        var map = this.map;

        if (map != null) {
          var coords = this.props.activeFeature.geometry.coordinates;
          var center = new this.props.google.maps.LatLng(coords[1], coords[0]);
          map.panTo(center);
        }
      }

      if (!this.props.isMobile && !this.props.activeFeature && prevProps.activeFeature !== this.props.activeFeature) {
        this.resetMap();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          loaded = _this$props.loaded,
          google = _this$props.google,
          activeFeature = _this$props.activeFeature,
          onFeatureMapClick = _this$props.onFeatureMapClick;
      var features = this.state.features;
      var zoom = activeFeature ? constants.MAP_ZOOM_LEVEL.FEATURE : constants.MAP_ZOOM_LEVEL.DEFAULT;

      var settings = _objectSpread(_objectSpread({}, this.mapSettings), {}, {
        zoom: zoom
      });

      var center = activeFeature ? null : constants.DEFAULT_MAP_CENTER;

      if (!loaded || !google) {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "loading"
        });
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        className: "map-container"
      }, /*#__PURE__*/_react.default.createElement(_googleMapsReact.Map, _extends({
        ref: this.mapRef,
        google: google,
        initialCenter: center,
        onReady: function onReady(mapProps, map) {
          return _this2.onMapReady(mapProps, map);
        },
        containerStyle: {
          height: '100%'
        }
      }, settings), features.map(function (feature, i) {
        var validPrograms = ["StART Support", "Partnership Program", "Outside the Box"];
        var program = validPrograms.includes(feature.properties.prgrm) ? feature.properties.prgrm : "Other";
        var isSelected = activeFeature && feature.properties.uid === activeFeature.properties.uid;
        var icon = {
          url: constants.ICONS_REG[program].icon,
          anchor: isSelected ? new google.maps.Point(20, 20) : new google.maps.Point(10, 10),
          scaledSize: isSelected ? new google.maps.Size(40, 40) : new google.maps.Size(20, 20),
          className: 'delay-in'
        };
        return /*#__PURE__*/_react.default.createElement(_googleMapsReact.Marker, {
          key: feature.properties.uid,
          icon: icon,
          position: {
            lng: feature.geometry.coordinates[0],
            lat: feature.geometry.coordinates[1]
          },
          onClick: function onClick() {
            return onFeatureMapClick(feature);
          },
          zIndex: isSelected ? 2 : 1
        });
      })), /*#__PURE__*/_react.default.createElement(_react.Suspense, {
        fallback: /*#__PURE__*/_react.default.createElement("div", {
          className: "loading"
        })
      }, /*#__PURE__*/_react.default.createElement(GeolocateButton, {
        onClick: this.geolocation
      }), /*#__PURE__*/_react.default.createElement(MapLegend, null)));
    }
  }]);

  return InteractiveMap;
}(_react.default.Component);

_defineProperty(InteractiveMap, "propTypes", {
  onFeatureMapClick: _propTypes.default.func,
  isMobile: _propTypes.default.bool
});

var _default = (0, _googleMapsReact.GoogleApiWrapper)(function (props) {
  return {
    apiKey: props.googleApiKey
  };
})(InteractiveMap);

exports.default = _default;