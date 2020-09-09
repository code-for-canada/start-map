"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactSelect = _interopRequireDefault(require("react-select"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Select component extended with a "Select all" option.
 *
 * @see https://medium.com/@alex_escalante/react-select-alloptionoptions-with-a-single-click-1ebf5a33fe31
 * @see https://github.com/JedWatson/react-select/issues/892
 */
var SelectAll = function SelectAll(props) {
  var isNoneSelected = function isNoneSelected(selected) {
    return selected === null || selected.length === 0;
  };

  var areAllSelected = function areAllSelected(props) {
    return props.value !== null && props.value.length === props.options.length;
  };

  if (props.allowSelectAll) {
    if (areAllSelected(props)) {
      return /*#__PURE__*/_react.default.createElement(_reactSelect.default, _extends({}, props, {
        value: [props.allOption],
        onChange: function onChange(selected) {
          if (isNoneSelected(selected)) {
            return props.onChange(props.options);
          } else {
            return props.onChange(selected.slice(1));
          }
        },
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
      }));
    } else {
      return /*#__PURE__*/_react.default.createElement(_reactSelect.default, _extends({}, props, {
        options: [props.allOption].concat(_toConsumableArray(props.options)),
        onChange: function onChange(selected) {
          if (isNoneSelected(selected) || selected.includes(props.allOption)) {
            return props.onChange(props.options);
          } else {
            return props.onChange(selected);
          }
        },
        theme: function theme(_theme2) {
          return _objectSpread(_objectSpread({}, _theme2), {}, {
            colors: _objectSpread(_objectSpread({}, _theme2.colors), {}, {
              primary: '#64aae2',
              primary75: '#64aae2b8',
              primary50: '#64aae27a',
              primary25: '#64aae242',
              neutral20: '#8c8c8c',
              neutral30: '#343a40'
            })
          });
        }
      }));
    }
  }

  return /*#__PURE__*/_react.default.createElement(_reactSelect.default, _extends({}, props, {
    theme: function theme(_theme3) {
      return _objectSpread(_objectSpread({}, _theme3), {}, {
        colors: _objectSpread(_objectSpread({}, _theme3.colors), {}, {
          primary: '#64aae2',
          primary75: '#64aae2b8',
          primary50: '#64aae27a',
          primary25: '#64aae242',
          neutral20: '#8c8c8c',
          neutral30: '#343a40'
        })
      });
    }
  }));
};

SelectAll.propTypes = {
  /** Enable "select all" option. */
  allowSelectAll: _propTypes.default.bool,

  /** How the "select all" option is displayed. */
  allOption: _propTypes.default.shape({
    label: _propTypes.default.string,
    value: _propTypes.default.string
  }),

  /**
   * Remaining props inherit definitions from the ReactSelect component.
   *
   * @see https://react-select.com/props
   * @see https://github.com/JedWatson/react-select/blob/v2.4.4/src/Select.js#L78
   */

  /** Array of options that populate the select menu */
  options: _propTypes.default.array,

  /** The value of the select; reflected by the selected option */
  value: _propTypes.default.any,

  /** Handle change events on the select */
  onChange: _propTypes.default.func,
  setValue: _propTypes.default.func
};
SelectAll.defaultProps = {
  allOption: {
    label: "Select all",
    value: "*"
  }
};
var _default = SelectAll;
exports.default = _default;