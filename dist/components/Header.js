"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _logo = _interopRequireDefault(require("../assets/img/logo.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = function Header(_ref) {
  var isMobile = _ref.isMobile;

  if (!isMobile) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement("header", {
    className: "main-header"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "brand"
  }, /*#__PURE__*/_react.default.createElement("img", {
    alt: "City of Toronto logo",
    "aria-label": "Logo",
    src: _logo.default
  }), /*#__PURE__*/_react.default.createElement("div", {
    "aria-hidden": true,
    className: "program-name"
  }, "StreetARToronto"), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      opacity: 0,
      height: 0,
      width: 0,
      margin: 0,
      padding: 0,
      position: 'absolute',
      left: 0,
      top: 0
    },
    className: "program-name"
  }, "Street Art Toronto")));
};

Header.propTypes = {
  isMobile: _propTypes.default.bool.isRequired
};
var _default = Header;
exports.default = _default;