"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Switch = _interopRequireDefault(require("./Switch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WardToggle = function WardToggle(_ref) {
  var showWardLayer = _ref.showWardLayer,
      onClick = _ref.onClick;
  return /*#__PURE__*/_react.default.createElement(_Switch.default, {
    handleChange: onClick,
    value: showWardLayer,
    trueLabel: "ON",
    falseLabel: "OFF",
    "aria-labelledby": "ward-layer-label"
  });
};

WardToggle.propTypes = {
  showWardLayer: _propTypes.default.bool,
  onClick: _propTypes.default.func
};
var _default = WardToggle;
exports.default = _default;