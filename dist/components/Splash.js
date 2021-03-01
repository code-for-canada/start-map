"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    className: "text-muted text-xs mt-6"
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