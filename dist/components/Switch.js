"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var SwitchWithLabels = function SwitchWithLabels(props) {
  var falseLabel = props.falseLabel,
      trueLabel = props.trueLabel,
      label = props.label,
      name = props.name,
      id = props.id,
      required = props.required,
      disabled = props.disabled,
      errorMessage = props.errorMessage,
      helpText = props.helpText,
      classes = props.classes,
      offColor = props.offColor,
      onColor = props.onColor,
      value = props.value,
      handleChange = props.handleChange,
      rest = _objectWithoutProperties(props, ["falseLabel", "trueLabel", "label", "name", "id", "required", "disabled", "errorMessage", "helpText", "classes", "offColor", "onColor", "value", "handleChange"]);

  var bgColor = value ? onColor : offColor;

  var onChange = function onChange(event) {
    var checked = event.currentTarget.checked;
    handleChange(_defineProperty({}, name, checked));
  };

  var onClickLabel = function onClickLabel(checked) {
    return function () {
      handleChange(_defineProperty({}, name, checked));
    };
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "switch-container"
  }, /*#__PURE__*/_react.default.createElement("span", {
    onClick: onClickLabel(false)
  }, falseLabel), /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("input", _extends({
    checked: value,
    onChange: onChange,
    className: "switch",
    type: "checkbox",
    disabled: disabled,
    required: required,
    id: id
  }, rest)), /*#__PURE__*/_react.default.createElement("div", {
    className: "switch-background ".concat(value ? 'on' : 'off'),
    style: {
      backgroundColor: bgColor
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "switch-button"
  }))), /*#__PURE__*/_react.default.createElement("span", {
    onClick: onClickLabel(true)
  }, trueLabel));
};

SwitchWithLabels.propTypes = {
  handleChange: _propTypes.default.func.isRequired,
  falseLabel: _propTypes.default.string.isRequired,
  trueLabel: _propTypes.default.string.isRequired,
  value: _propTypes.default.bool,
  label: _propTypes.default.string,
  name: _propTypes.default.string,
  errorMessage: _propTypes.default.string,
  helpText: _propTypes.default.string,
  required: _propTypes.default.bool,
  offColor: _propTypes.default.string,
  onColor: _propTypes.default.string
};
SwitchWithLabels.defaultProps = {
  handleChange: function handleChange(checked) {
    return "Implement a function to save checked input: ".concat(checked);
  },
  falseLabel: "Off",
  trueLabel: "On",
  value: false,
  offColor: '#004B84',
  // dark blue
  onColor: '#CFB51D' // yellow

};
var _default = SwitchWithLabels;
exports.default = _default;