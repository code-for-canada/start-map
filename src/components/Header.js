import React from "react";
import PropTypes from "prop-types";
import logo from '../assets/img/logo.svg';

const Header = ({ isMobile }) => {
  if (!isMobile) {
    return null;
  }

  return(
    <header className="main-header">
      <div className={"brand"}>
        <img alt="City of Toronto logo" aria-label="Logo" src={logo}/>
        <div aria-hidden={true} className="program-name">StreetARToronto</div>
        <div style={{ opacity: 0, height: 0, width: 0, margin: 0, padding: 0, position: 'absolute', left: 0, top: 0 }} className="program-name">Street Art Toronto</div>
      </div>
    </header>
  )
}

Header.propTypes = {
  isMobile: PropTypes.bool.isRequired,
}

export default Header
