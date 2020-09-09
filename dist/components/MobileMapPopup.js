"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _MobileMapPopupArtwork = _interopRequireDefault(require("./MobileMapPopupArtwork"));

var _MobileMapPopupWard = _interopRequireDefault(require("./MobileMapPopupWard"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Renders the little hovering popup at the bottom of mobile map view, in
 * which ward and artwork data are shown when feature is clicked/active.
 */
var MobileMapPopup = function MobileMapPopup(_ref) {
  var onClick = _ref.onClick,
      activeFeature = _ref.activeFeature;

  if (!activeFeature) {
    return null;
  }

  var getFeatureCoverImageSrc = function getFeatureCoverImageSrc() {
    if (activeFeature.getProperty('media')) {
      return (0, _utils.getCoverImage)(activeFeature.getProperty('media'));
    }

    return '';
  };

  var handleKeyPress = function handleKeyPress(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      onClick();
    }
  }; // Only wards have this property.


  var isArtwork = !activeFeature.getProperty('AREA_L_CD');
  return /*#__PURE__*/_react.default.createElement("div", {
    id: "mobile-map-popup",
    onClick: onClick,
    role: "button",
    onKeyPress: handleKeyPress,
    tabIndex: 0
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "width-100 display-flex p-2"
  }, isArtwork ? /*#__PURE__*/_react.default.createElement(_MobileMapPopupArtwork.default, {
    imgSrc: getFeatureCoverImageSrc(),
    year: activeFeature.getProperty('yr'),
    artist: activeFeature.getProperty('artist'),
    address: activeFeature.getProperty('address')
  }) : /*#__PURE__*/_react.default.createElement(_MobileMapPopupWard.default, {
    wardNumber: activeFeature.getProperty('AREA_L_CD'),
    wardName: activeFeature.getProperty('AREA_NAME')
  })));
};

MobileMapPopup.propTypes = {
  onClick: _propTypes.default.func.isRequired,
  activeFeature: _propTypes.default.object
};
MobileMapPopup.defaultProps = {
  activeFeature: {}
};
var _default = MobileMapPopup;
exports.default = _default;