"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactLazyload = require("react-lazyload");

var _FeatureListItem = _interopRequireDefault(require("./FeatureListItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var FeatureList = function FeatureList(_ref) {
  var features = _ref.features,
      onItemClick = _ref.onItemClick,
      isMobile = _ref.isMobile,
      activeFeature = _ref.activeFeature;
  (0, _react.useEffect)(function () {
    (0, _reactLazyload.forceCheck)();
  });
  return /*#__PURE__*/_react.default.createElement("div", {
    id: "results",
    className: "list-container",
    role: "region",
    "aria-live": "polite"
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "text-right"
  }, features.length, " Results"), /*#__PURE__*/_react.default.createElement("ul", {
    id: "list"
  }, features.map(function (feature) {
    return /*#__PURE__*/_react.default.createElement(_FeatureListItem.default, {
      key: feature.properties.uid,
      feature: feature,
      onClick: onItemClick,
      isMobile: isMobile,
      activeFeature: activeFeature
    });
  })));
};

_FeatureListItem.default.propTypes = {
  features: _propTypes.default.arrayOf(_propTypes.default.object),
  onItemClick: _propTypes.default.func
};
var _default = FeatureList;
exports.default = _default;