import React from "react";
import PropTypes from "prop-types";

const BetaBanner = ({ isMobile }) => {
  return(
    <aside className="banner-wrapper">
      <div className={isMobile ? "beta-banner-mobile" : "beta-banner"}>
        <h6 className={isMobile ? "beta-text-mobile" : "beta-text"}>
          Beta
        </h6>
      </div>
    </aside>
  )
}

BetaBanner.propTypes = {
  isMobile: PropTypes.bool.isRequired,
}

export default BetaBanner
