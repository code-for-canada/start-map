import React from "react";
import PropTypes from "prop-types";
import {
  MobileListToggleButton,
  MobileFilterViewButton,
} from "./Buttons";

import logo from '../assets/img/logo.svg';

const Header = ({ isMobile, isFiltered, viewType, toggleListViewMobile, setMobileFilterView }) => {
  return(
    <header className="main-header">
      <div className={"brand"}>
        <img alt="City of Toronto logo" aria-label="Logo" src={logo}/>
        <div aria-hidden={true} className="program-name">StreetARToronto</div>
        <div style={{ opacity: 0, height: 0, width: 0, margin: 0, padding: 0 }} className="program-name">Street Art Toronto</div>
      </div>
      <div className="nav-items">
        <MobileListToggleButton onClick={toggleListViewMobile} isList={viewType === "list"}/>
        <MobileFilterViewButton onClick={setMobileFilterView} isFiltered={isFiltered}/>
      </div>
    </header>
  )
}

Header.propTypes = {
  isMobile: PropTypes.bool.isRequired,
}

export default Header