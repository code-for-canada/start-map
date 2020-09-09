"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  bottom: "25px",
  right: "10px",
  borderRadius: "2px"
};

var MapLegend = function MapLegend(props) {
  var programs = Object.keys(_constants.ICONS_REG);
  return /*#__PURE__*/_react.default.createElement("div", {
    id: "map-legend",
    className: "p-2 bg-white position-absolute shadow-depth",
    style: styles
  }, /*#__PURE__*/_react.default.createElement("h4", {
    className: "mb-1"
  }, "Legend"), /*#__PURE__*/_react.default.createElement("div", {
    className: ""
  }, /*#__PURE__*/_react.default.createElement("ul", null, programs.map(function (program) {
    return /*#__PURE__*/_react.default.createElement("li", {
      className: "display-flex align-center",
      key: program
    }, /*#__PURE__*/_react.default.createElement("img", {
      style: {
        height: '25px',
        width: '25px'
      },
      src: _constants.ICONS_REG[program].icon,
      alt: "Icon for ".concat(program),
      className: "pr-1"
    }), /*#__PURE__*/_react.default.createElement("span", null, program));
  }))));
};

var _default = MapLegend;
exports.default = _default;