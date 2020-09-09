"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _constants = require("../constants");

var _reactLeaflet = require("react-leaflet");

var _leaflet = _interopRequireDefault(require("leaflet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var icons = {
  "Partnership Program": {
    icon: new _leaflet.default.Icon({
      iconUrl: _constants.ICONS_REG["Partnership Program"].icon,
      iconRetinaUrl: _constants.ICONS_REG["Partnership Program"].icon,
      iconAnchor: [12, 12],
      iconSize: [25, 25]
    })
  },
  "Outside the Box": {
    icon: new _leaflet.default.Icon({
      iconUrl: _constants.ICONS_REG["Outside the Box"].icon,
      iconRetinaUrl: _constants.ICONS_REG["Outside the Box"].icon,
      iconAnchor: [12, 12],
      iconSize: [25, 25]
    })
  },
  "StART Support": {
    icon: new _leaflet.default.Icon({
      iconUrl: _constants.ICONS_REG["StART Support"].icon,
      iconRetinaUrl: _constants.ICONS_REG["StART Support"].icon,
      iconAnchor: [12, 12],
      iconSize: [25, 25]
    })
  },
  "Other": {
    icon: new _leaflet.default.Icon({
      iconUrl: _constants.ICONS_REG["Other"].icon,
      iconRetinaUrl: _constants.ICONS_REG["Other"].icon,
      iconAnchor: [12, 12],
      iconSize: [25, 25]
    })
  }
};

var MapMarkers = function MapMarkers(_ref) {
  var features = _ref.features,
      activeFeature = _ref.activeFeature,
      onFeatureMapClick = _ref.onFeatureMapClick;
  var markers = features.map(function (feature, i) {
    var program = icons[feature.properties.prgrm] ? feature.properties.prgrm : "Other";
    var isSelected = activeFeature && feature.properties.uid === activeFeature.properties.uid;
    var icon;

    if (isSelected) {
      icon = new _leaflet.default.Icon({
        iconUrl: _constants.ICONS_REG[program].icon,
        iconRetinaUrl: _constants.ICONS_REG[program].icon,
        iconAnchor: [25, 25],
        iconSize: [50, 50],
        className: 'delay-in'
      });
    } else {
      icon = new _leaflet.default.Icon({
        iconUrl: _constants.ICONS_REG[program].icon,
        iconRetinaUrl: _constants.ICONS_REG[program].icon,
        iconAnchor: [12, 12],
        iconSize: [25, 25],
        className: 'delay-in'
      });
    }

    return /*#__PURE__*/_react.default.createElement(_reactLeaflet.Marker, {
      key: feature.properties.uid,
      position: [feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
      icon: icon,
      onClick: function onClick() {
        return onFeatureMapClick(feature);
      },
      zIndexOffset: isSelected ? 9999 : 0
    });
  });
  return markers;
};

var _default = MapMarkers;
exports.default = _default;