import React from "react";
import { ICONS_REG } from "../constants";

const styles = {
  bottom: "25px",
  right: "10px",
  borderRadius: "2px",
}

const MapLegend = props => {
  const programs = Object.keys(ICONS_REG);
  return(
    <div id="map-legend" className="p-2 bg-white position-absolute shadow-depth" style={styles}>
      <h4 className="mb-1">Legend</h4>
      <div className="">
        <ul>
          { programs.map(program => (
            <li className="display-flex" key={program}>
              <img src={ICONS_REG[program].icon} alt={`Icon for ${program}`} className="pr-1" />
              <span>{program}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default MapLegend
