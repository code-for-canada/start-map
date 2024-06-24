import React from "react";
import { ICONS_REG } from "../constants";
import { Marker } from 'react-leaflet'
import L from 'leaflet'

const icons = {
  "Partnership Program": {
    icon: new L.Icon({
      iconUrl: ICONS_REG["Partnership Program"].icon,
      iconRetinaUrl: ICONS_REG["Partnership Program"].icon,
      iconAnchor: [12, 12],
      iconSize: [25, 25],
    })
  },
  "Outside the Box": {
    icon: new L.Icon({
      iconUrl: ICONS_REG["Outside the Box"].icon,
      iconRetinaUrl: ICONS_REG["Outside the Box"].icon,
      iconAnchor: [12, 12],
      iconSize: [25, 25],
    })
  },
  "StART Support": {
    icon: new L.Icon({
      iconUrl: ICONS_REG["StART Support"].icon,
      iconRetinaUrl: ICONS_REG["StART Support"].icon,
      iconAnchor: [12, 12],
      iconSize: [25, 25],
    })
  },
  "Other": {
    icon: new L.Icon({
      iconUrl: ICONS_REG["Other"].icon,
      iconRetinaUrl: ICONS_REG["Other"].icon,
      iconAnchor: [12, 12],
      iconSize: [25, 25],
    })
  }
};

const MapMarkers = ({ features, activeFeature, onFeatureMapClick }) => {
  const markers = features.map((feature, i) => {
    const program = icons[feature.properties.program] ? feature.properties.program : "Other"
    const isSelected = activeFeature && feature.properties.uid === activeFeature.properties.uid
    let icon;

    if (isSelected) {
      icon = new L.Icon({
        iconUrl: ICONS_REG[program].icon,
        iconRetinaUrl: ICONS_REG[program].icon,
        iconAnchor: [25, 25],
        iconSize: [50, 50],
        className: 'delay-in'
      })
    } else {
      icon = new L.Icon({
        iconUrl: ICONS_REG[program].icon,
        iconRetinaUrl: ICONS_REG[program].icon,
        iconAnchor: [12, 12],
        iconSize: [25, 25],
        className: 'delay-in'
      })
    }

    return(
      <Marker
        key={feature.properties.uid}
        position={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]}
        icon={icon}
        onClick={() => onFeatureMapClick(feature.id) }
        zIndexOffset={isSelected ? 9999 : 0}
      />
    )
  })

  return markers

}

export default MapMarkers
