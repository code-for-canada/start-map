"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _SelectAll = _interopRequireDefault(require("./SelectAll"));

var _reactGa = _interopRequireDefault(require("react-ga"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var YearDropdown = function YearDropdown(_ref) {
  var onSelect = _ref.onSelect,
      selected = _ref.selected;

  var handleChange = function handleChange(selectedOptions) {
    _reactGa.default.event({
      category: 'Form Fields',
      action: 'Filter artwork',
      label: 'By year'
    });

    onSelect(selectedOptions);
  };

  return /*#__PURE__*/_react.default.createElement(_SelectAll.default, {
    allowSelectAll: true,
    closeMenuOnSelect: false,
    isMulti: true,
    value: selected,
    onChange: handleChange,
    options: _constants.YEAR_OPTS,
    className: "drp",
    id: 'year'
  });
};

YearDropdown.propTypes = {
  onSelect: _propTypes.default.func,
  selected: _propTypes.default.array
};
var _default = YearDropdown;
exports.default = _default;