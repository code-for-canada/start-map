"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var styles = {
  display: 'block',
  position: 'absolute',
  background: 'rgba(52,58,64,.5)',
  width: '100%',
  height: '100%',
  zIndex: 2
};

var Splash = function Splash(_ref) {
  var openSplash = _ref.openSplash,
      closeSplash = _ref.closeSplash,
      isMobile = _ref.isMobile,
      showSplash = _ref.showSplash;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      showDisclaimer = _useState2[0],
      setShowDisclaimer = _useState2[1];

  var visibilityClass = showSplash ? 'open' : 'closed';
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("button", {
    id: "toggle-splash",
    onClick: openSplash,
    className: visibilityClass
  }, "?"), /*#__PURE__*/_react.default.createElement("div", {
    className: "splash-container ".concat(visibilityClass)
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: "splash",
    className: "shadow-depth ".concat(visibilityClass)
  }, /*#__PURE__*/_react.default.createElement("button", {
    onClick: closeSplash,
    className: "btn btn-light close"
  }, "\xD7"), /*#__PURE__*/_react.default.createElement("div", {
    className: "content"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "title text-center"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "mb-2 text-bold text-blue text-large"
  }, "Welcome to"), /*#__PURE__*/_react.default.createElement("h1", {
    className: "title"
  }, "StreetARToronto - The Map!")), /*#__PURE__*/_react.default.createElement("p", {
    className: "text-italic"
  }, "A joint project of StreetARToronto (StART) and Civic Hall Toronto"), /*#__PURE__*/_react.default.createElement("p", null, "Toronto is home to some of the best mural, street and graffiti artists and art in the world. These artists and artworks have transformed Toronto's public streets, laneways and parks into a city-wide art gallery!"), /*#__PURE__*/_react.default.createElement("p", null, "This map based app will help you explore the amazing street art located throughout the city. The current database provides a sampling of murals created as part of the StreetARToronto suite of programs from 2012 to 2019. In addition to identifying the artist and arts organization responsible for painting the mural, the database describes the stories and themes behind each unique and beautiful artwork."), /*#__PURE__*/_react.default.createElement("p", null, "Individually and collectively, these murals are designed to celebrate the City of Toronto motto \"Diversity Our Strength\" and foster a greater sense of belonging among all."), /*#__PURE__*/_react.default.createElement("p", null, "Filters allow you to search by any combination of Year and/or Ward. Additional filters will be installed and the database is being updated regularly to add more artwork, so check back often!"), /*#__PURE__*/_react.default.createElement("ul", {
    className: "splash-footer mt-6"
  }, /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("a", {
    href: "https://www.toronto.ca/services-payments/streets-parking-transportation/enhancing-our-streets-and-public-realm/streetartoronto/",
    target: "_blank",
    rel: "noreferrer noopener"
  }, "Website")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("a", {
    href: "https://www.youtube.com/playlist?list=PLp11YxteHNp1OVLdlHyA7QEc2bjCADGqJ",
    target: "_blank",
    rel: "noreferrer noopener"
  }, "YouTube"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "mt-6"
  }, /*#__PURE__*/_react.default.createElement("button", {
    "aria-label": "Close",
    onClick: closeSplash,
    className: "splash-btn btn btn-highlight btn-lg"
  }, "Get Started!")), /*#__PURE__*/_react.default.createElement("p", {
    className: "text-muted text-small mt-6"
  }, "All elements of the website, including, but not limited to, the general design and the content, are protected by copyright. Except as explicitly permitted under another the agreement between StreetARToronto and the Artist, no portion or element of this website or its content may be copied or retransmitted via any means and this website, its content and all related rights shall remain the exclusive property of StreetARToronto or its licensors.")))), /*#__PURE__*/_react.default.createElement("div", {
    className: "splash-background ".concat(visibilityClass),
    onClick: closeSplash,
    style: styles
  }));
};

Splash.propTypes = {
  onButtonClick: _propTypes.default.func,
  isMobile: _propTypes.default.bool
};
var _default = Splash;
exports.default = _default;