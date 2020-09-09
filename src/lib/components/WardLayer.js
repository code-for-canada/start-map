import React, { useEffect, useState } from 'react';
import { Polygon } from 'google-maps-react'
import hash from 'object-hash';

const WardLayer = ({ showWardLayer }) => {
  const [ state, setState ] = useState({ wards: {}, selectedWardLayer: null })

  const fetchWards = () => {
    fetch('geojson/wards.json')
      .then(response => response.json())
      .then(json => {
        setState({ wards: json, selectedWardLayer: null })
      });
  }

  useEffect(() => {
    if (showWardLayer && !state.wards.features) {
      fetchWards()
    }
  })


  const geoJSONstyle = () => {
    return {
      color: '#64aae2',
      weight: 2,
      fillOpacity: 0.1,
      fillColor: '#64aae2',
    }
  }

  const handleWardClick = (feature, layer) => {
    layer.bindPopup(`Ward ${feature.properties.AREA_S_CD}: ${feature.properties.AREA_NAME}`);

    layer.on('click', function (e) {
      // if (state.selectedWardLayer) {
      //   console.log("state.selectedWardLayer", state.selectedWardLayer)
      //   state.selectedWardLayer.resetStyle()
      // }

      setState({ ...state, selectedWardLayer: layer })
      layer.setStyle({fillColor: '#CFB51D' }) // $yellow
    });
  }

  if (!showWardLayer || !state.wards.features) { return <div /> }

  return state.wards.features.map(ward => (
    <Polygon
      key={ward.properties.AREA_ID}
      paths={ward.geometry.coordinates}
      strokeColor='#64aae2'
      strokeOpacity={1}
      strokeWeight={2}
      fillOpacity={0.1}
      fillColor='#64aae2'
    />
  ))
}

WardLayer.defaultProps = {
  showWardLayer: false
}

export default WardLayer

