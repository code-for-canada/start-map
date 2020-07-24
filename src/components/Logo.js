import React from "react";
import logo from '../assets/img/logo.svg';

const Logo = ({ size }) => {
  return(
    <header className={`logo-header ${size}`}>
      <img alt="City of Toronto logo" aria-label="Logo" src={logo}/>
      <h1 aria-hidden={true} className="program-name">StreetARToronto</h1>
      <h1 style={{ opacity: 0, height: 0, margin: 0, padding: 0 }} className="program-name">Street Art Toronto</h1>
    </header>
  )
}

Logo.defaultProps = {
  size: 'lg'
}

export default Logo
