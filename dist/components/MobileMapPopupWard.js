"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Component for rendering map popup when active feature geometry is a POLYGON
 * representing a WARD.
 */
var MobileMapPopupWard = function MobileMapPopupWard(_ref) {
  var wardNumber = _ref.wardNumber,
      wardName = _ref.wardName;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "popup-txt"
  }, /*#__PURE__*/_react.default.createElement("h5", {
    className: "detailWard"
  }, "Ward ", wardNumber, " ", /*#__PURE__*/_react.default.createElement("br", null), wardName));
};

MobileMapPopupWard.propTypes = {
  wardNumber: _propTypes.default.number.isRequired,
  wardName: _propTypes.default.string.isRequired
};
var _default = MobileMapPopupWard;
exports.default = _default;