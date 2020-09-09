"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactSelect = _interopRequireDefault(require("react-select"));

var _reactGa = _interopRequireDefault(require("react-ga"));

var _filter = _interopRequireDefault(require("lodash/filter"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SortDropdown = function SortDropdown(_ref) {
  var onSelect = _ref.onSelect,
      sortType = _ref.sortType;

  var handleChange = function handleChange(inputValue) {
    _reactGa.default.event({
      category: 'Form Fields',
      action: 'Sort artwork',
      label: "Sort by ".concat(inputValue.label)
    });

    onSelect(inputValue.value);
  };

  var selectedOption = (0, _filter.default)(_constants.SORT_OPTS, {
    value: sortType
  });
  return /*#__PURE__*/_react.default.createElement(_reactSelect.default, {
    closeMenuOnSelect: true,
    isMulti: false,
    clearable: false,
    value: selectedOption,
    onChange: handleChange,
    options: _constants.SORT_OPTS,
    className: "drp",
    id: 'sort',
    theme: function theme(_theme) {
      return _objectSpread(_objectSpread({}, _theme), {}, {
        colors: _objectSpread(_objectSpread({}, _theme.colors), {}, {
          primary: '#64aae2',
          primary75: '#64aae2b8',
          primary50: '#64aae27a',
          primary25: '#64aae242',
          neutral20: '#8c8c8c',
          neutral30: '#343a40'
        })
      });
    }
  });
};

SortDropdown.propTypes = {
  onSelect: _propTypes.default.func,
  sortType: _propTypes.default.string
};
var _default = SortDropdown;
exports.default = _default;