"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeolocateButton = exports.MobileFilterViewButton = exports.MobileListToggleButton = exports.BackToListViewButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _crosshair = _interopRequireDefault(require("../assets/img/crosshair.svg"));

var _reactGa = _interopRequireDefault(require("react-ga"));

var _Switch = _interopRequireDefault(require("./Switch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BackToListViewButton = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "back-to-list",
    onClick: props.onClick
  }, /*#__PURE__*/_react.default.createElement("button", {
    ref: ref,
    "aria-label": "Back",
    id: "back",
    type: "button",
    className: "btn btn-light"
  }, "\u2190 Back"));
});

exports.BackToListViewButton = BackToListViewButton;

var MobileListToggleButton = function MobileListToggleButton(_ref) {
  var onClick = _ref.onClick,
      isList = _ref.isList;
  return /*#__PURE__*/_react.default.createElement(_Switch.default, {
    handleChange: onClick,
    value: isList,
    trueLabel: "LIST",
    falseLabel: "MAP",
    "aria-label": "Toggle map or list view"
  });
};

exports.MobileListToggleButton = MobileListToggleButton;

var MobileFilterViewButton = function MobileFilterViewButton(_ref2) {
  var _onClick = _ref2.onClick,
      isFiltered = _ref2.isFiltered,
      showFilters = _ref2.showFilters;
  return /*#__PURE__*/_react.default.createElement("div", {
    id: "filter"
  }, isFiltered ? /*#__PURE__*/_react.default.createElement("div", {
    id: "filter-marker"
  }) : null, /*#__PURE__*/_react.default.createElement("button", {
    "aria-label": "Filter View",
    id: "filter-btn",
    onClick: function onClick() {
      return _onClick(true);
    },
    type: "button",
    className: "btn btn-dark btn-sm",
    "aria-haspopup": "true",
    "aria-expanded": "false"
  }, "Filters", /*#__PURE__*/_react.default.createElement("span", {
    style: {
      marginLeft: '4px '
    }
  }, showFilters ? '×' : '+')));
};

exports.MobileFilterViewButton = MobileFilterViewButton;

var GeolocateButton = function GeolocateButton(_ref3) {
  var onClick = _ref3.onClick;

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

exports.GeolocateButton = GeolocateButton;
BackToListViewButton.propTypes = {
  onClick: _propTypes.default.func
};
MobileListToggleButton.propTypes = {
  onClick: _propTypes.default.func,
  isList: _propTypes.default.bool
};
MobileFilterViewButton.propTypes = {
  onClick: _propTypes.default.func,
  isFiltered: _propTypes.default.bool
};
GeolocateButton.propTypes = {
  onClick: _propTypes.default.func
};