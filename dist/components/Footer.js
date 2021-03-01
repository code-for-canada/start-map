"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Buttons = require("./Buttons");

var _Filters = _interopRequireDefault(require("./Filters"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Footer = function Footer(_ref) {
  var isMobile = _ref.isMobile,
      isFiltered = _ref.isFiltered,
      viewType = _ref.viewType,
      toggleListViewMobile = _ref.toggleListViewMobile,
      toggleFilters = _ref.toggleFilters,
      showFilters = _ref.showFilters,
      rest = _objectWithoutProperties(_ref, ["isMobile", "isFiltered", "viewType", "toggleListViewMobile", "toggleFilters", "showFilters"]);

  if (!isMobile) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement("footer", {
    className: "footer"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "nav-items"
  }, /*#__PURE__*/_react.default.createElement(_Buttons.MobileListToggleButton, {
    onClick: toggleListViewMobile,
    isList: viewType === "list"
  }), /*#__PURE__*/_react.default.createElement(_Buttons.MobileFilterViewButton, {
    onClick: toggleFilters,
    isFiltered: isFiltered,
    showFilters: showFilters
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "filter-menu mobile-".concat(showFilters ? 'open' : 'closed')
  }, /*#__PURE__*/_react.default.createElement(_Filters.default, rest)));
};

Footer.propTypes = {
  isMobile: _propTypes.default.bool.isRequired
};
var _default = Footer;
exports.default = _default;