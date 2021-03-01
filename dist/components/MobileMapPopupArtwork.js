"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Component for rendering map popup when active feature geometry is a POINT
 * representing an ARTWORK.
 */
var MobileMapPopupArtwork = function MobileMapPopupArtwork(_ref) {
  var imgSrc = _ref.imgSrc,
      year = _ref.year,
      artist = _ref.artist,
      address = _ref.address;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "popup-pic"
  }, /*#__PURE__*/_react.default.createElement("img", {
    alt: "Photo of artwork",
    "aria-label": "Thumbnail Preview",
    src: imgSrc,
    className: "list-img",
    onError: _utils.handleMissingImage
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "popup-tx ml-2"
  }, /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("strong", {
    className: "tileArtist"
  }, artist)), /*#__PURE__*/_react.default.createElement("p", {
    className: "tileAddress"
  }, address), /*#__PURE__*/_react.default.createElement("p", {
    className: "tileYear"
  }, "Created in ", year)));
};

MobileMapPopupArtwork.propTypes = {
  imgSrc: _propTypes.default.string,
  artist: _propTypes.default.string,
  address: _propTypes.default.string,
  year: _propTypes.default.number.isRequired
};
MobileMapPopupArtwork.defaultProps = {
  imgSrc: '',
  artist: '',
  address: ''
};
var _default = MobileMapPopupArtwork;
exports.default = _default;