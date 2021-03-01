"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _logo = _interopRequireDefault(require("../assets/img/logo.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Logo = function Logo(_ref) {
  var size = _ref.size;
  return /*#__PURE__*/_react.default.createElement("header", {
    className: "logo-header ".concat(size)
  }, /*#__PURE__*/_react.default.createElement("img", {
    alt: "City of Toronto logo",
    "aria-label": "Logo",
    src: _logo.default
  }), /*#__PURE__*/_react.default.createElement("h1", {
    "aria-hidden": true,
    className: "program-name mt-2"
  }, "StreetARToronto"), /*#__PURE__*/_react.default.createElement("h1", {
    style: {
      opacity: 0,
      height: 0,
      margin: 0,
      padding: 0
    },
    className: "program-name"
  }, "Street Art Toronto"));
};

Logo.defaultProps = {
  size: 'lg'
};
var _default = Logo;
exports.default = _default;