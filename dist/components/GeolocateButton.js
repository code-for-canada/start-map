"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _crosshair = _interopRequireDefault(require("../assets/img/crosshair.svg"));

var _reactGa = _interopRequireDefault(require("react-ga"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GeolocateButton = function GeolocateButton(_ref) {
  var onClick = _ref.onClick;

  var handleClick = function handleClick() {
    _reactGa.default.event({
      category: 'Map',
      action: 'Click geolocation button'
    });

    onClick();
  };

  return /*#__PURE__*/_react.default.createElement("button", {
    "aria-label": "Center map on your location",
    id: "geolocate-btn",
    onClick: handleClick,
    type: "button",
    className: ""
  }, /*#__PURE__*/_react.default.createElement("img", {
    alt: "Crosshairs graphic",
    "aria-label": "Geolocate",
    id: "crosshairs",
    src: _crosshair.default
  }));
};

GeolocateButton.propTypes = {
  onClick: _propTypes.default.func
};
var _default = GeolocateButton;
exports.default = _default;