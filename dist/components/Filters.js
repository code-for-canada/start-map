"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _YearDropdown = _interopRequireDefault(require("./YearDropdown"));

var _WardDropdown = _interopRequireDefault(require("./WardDropdown"));

var _ProgramDropdown = _interopRequireDefault(require("./ProgramDropdown"));

var _WardToggle = _interopRequireDefault(require("./WardToggle"));

var _SortDropdown = _interopRequireDefault(require("./SortDropdown"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Filters = function Filters(_ref) {
  var handleSelectYears = _ref.handleSelectYears,
      handleSelectWards = _ref.handleSelectWards,
      handleSelectPrograms = _ref.handleSelectPrograms,
      setSortType = _ref.setSortType,
      toggleWardLayer = _ref.toggleWardLayer,
      years = _ref.years,
      wards = _ref.wards,
      programs = _ref.programs,
      showWardLayer = _ref.showWardLayer,
      sortType = _ref.sortType;
  return /*#__PURE__*/_react.default.createElement("form", {
    "aria-label": "Filter artworks",
    className: "filter-wrap",
    "aria-controls": "results"
  }, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "year"
  }, "Filter by year"), /*#__PURE__*/_react.default.createElement(_YearDropdown.default, {
    onSelect: handleSelectYears,
    selected: years
  }), /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "ward"
  }, "Filter by ward"), /*#__PURE__*/_react.default.createElement(_WardDropdown.default, {
    onSelect: handleSelectWards,
    selected: wards
  }), /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "program"
  }, "Filter by program"), /*#__PURE__*/_react.default.createElement(_ProgramDropdown.default, {
    onSelect: handleSelectPrograms,
    selected: programs
  }), /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "sort"
  }, "Sort by"), /*#__PURE__*/_react.default.createElement(_SortDropdown.default, {
    onSelect: setSortType,
    sortType: sortType
  }), /*#__PURE__*/_react.default.createElement("label", {
    id: "ward-layer-label"
  }, "Ward layer"), /*#__PURE__*/_react.default.createElement(_WardToggle.default, {
    onClick: toggleWardLayer,
    showWardLayer: showWardLayer
  }));
};

Filters.propTypes = {
  handleSelectYears: _propTypes.default.func.isRequired,
  handleSelectWards: _propTypes.default.func.isRequired,
  handleSelectPrograms: _propTypes.default.func.isRequired,
  setSortType: _propTypes.default.func.isRequired,
  years: _propTypes.default.array,
  wards: _propTypes.default.array,
  programs: _propTypes.default.array,
  showWardLayer: _propTypes.default.bool,
  sortType: _propTypes.default.string
};
var _default = Filters;
exports.default = _default;