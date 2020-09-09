"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactGa = _interopRequireDefault(require("react-ga"));

var _reactLazyload = _interopRequireDefault(require("react-lazyload"));

var utils = _interopRequireWildcard(require("../utils"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FeatureListItem = function FeatureListItem(_ref) {
  var feature = _ref.feature,
      onClick = _ref.onClick,
      isMobile = _ref.isMobile,
      activeFeature = _ref.activeFeature;
  var _feature$properties = feature.properties,
      _feature$properties$u = _feature$properties.uid,
      uid = _feature$properties$u === void 0 ? 0 : _feature$properties$u,
      yr = _feature$properties.yr,
      artist = _feature$properties.artist,
      _feature$properties$m = _feature$properties.media,
      media = _feature$properties$m === void 0 ? [] : _feature$properties$m,
      address = _feature$properties.address;

  var handleClick = function handleClick() {
    _reactGa.default.event({
      category: 'Artwork',
      action: 'View details',
      label: artist,
      value: uid
    });

    onClick(feature);
  };

  var handleKeyPress = function handleKeyPress(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      handleClick();
    }
  };

  return /*#__PURE__*/_react.default.createElement("li", {
    className: "lv-tile",
    onClick: handleClick,
    onKeyPress: handleKeyPress,
    tabIndex: 0,
    role: "button",
    "aria-expanded": activeFeature && activeFeature.properties.uid === uid ? 'true' : 'false',
    "aria-controls": "detail",
    id: uid
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "lv-tile-pic"
  }, /*#__PURE__*/_react.default.createElement(_reactLazyload.default, {
    height: 100,
    offset: 30,
    resize: true,
    overflow: isMobile,
    scrollContainer: isMobile ? null : ".nav-wrap"
  }, /*#__PURE__*/_react.default.createElement("img", {
    "aria-label": "Thumbnail Preview",
    alt: "Photo of artwork",
    className: "list-img",
    src: utils.getCoverImage(media),
    onError: utils.handleMissingImage
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "lv-tile-txt"
  }, /*#__PURE__*/_react.default.createElement("h3", {
    className: "tileArtist"
  }, artist), /*#__PURE__*/_react.default.createElement("p", {
    className: "tileAddress"
  }, address), /*#__PURE__*/_react.default.createElement("p", {
    className: "tileYear"
  }, yr)));
};

FeatureListItem.propTypes = {
  uid: _propTypes.default.number,
  media: _propTypes.default.arrayOf(_propTypes.default.object),
  artistName: _propTypes.default.string,
  address: _propTypes.default.string,
  year: _propTypes.default.number,
  onClick: _propTypes.default.func
};
FeatureListItem.defaultProps = {
  uid: 0,
  media: []
};
var _default = FeatureListItem;
exports.default = _default;