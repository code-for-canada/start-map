"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BetaBanner = function BetaBanner(_ref) {
  var isMobile = _ref.isMobile;
  return /*#__PURE__*/_react.default.createElement("aside", {
    className: "banner-wrapper"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "beta-banner"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "banner-text text-bold"
  }, "Beta")));
};

BetaBanner.propTypes = {
  isMobile: _propTypes.default.bool.isRequired
};
var _default = BetaBanner;
exports.default = _default;