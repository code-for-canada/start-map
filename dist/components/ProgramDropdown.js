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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ProgramDropdown = function ProgramDropdown(_ref) {
  var onSelect = _ref.onSelect,
      selected = _ref.selected;

  var handleChange = function handleChange(selectedOptions) {
    _reactGa.default.event({
      category: 'Form Fields',
      action: 'Filter artwork',
      label: 'By program'
    });

    onSelect(selectedOptions);
  };

  var colourStyles = {
    control: function control(base, state) {
      return _objectSpread(_objectSpread({}, base), {}, {
        backgroundColor: 'white'
      });
    },
    option: function option(base, state) {
      return _objectSpread(_objectSpread({}, base), {}, {
        color: state.isDisabled ? '#ccc' : state.data.color,
        cursor: state.isDisabled ? 'not-allowed' : 'default'
      });
    },
    multiValueLabel: function multiValueLabel(base, state) {
      return _objectSpread(_objectSpread({}, base), {}, {
        color: state.data.color
      });
    },
    multiValueRemove: function multiValueRemove(base, state) {
      return _objectSpread(_objectSpread({}, base), {}, {
        color: state.data.color,
        ':hover': {
          backgroundColor: state.data.color,
          color: 'white'
        }
      });
    }
  };
  return /*#__PURE__*/_react.default.createElement(_SelectAll.default, {
    allowSelectAll: true,
    closeMenuOnSelect: false,
    isMulti: true,
    value: selected,
    onChange: handleChange,
    options: _constants.PROGRAM_OPTS,
    className: "drp",
    styles: colourStyles,
    id: "program"
  });
};

ProgramDropdown.propTypes = {
  onSelect: _propTypes.default.func,
  selected: _propTypes.default.array
};
var _default = ProgramDropdown;
exports.default = _default;