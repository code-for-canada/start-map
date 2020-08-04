import React from "react";
import PropTypes from "prop-types";

const BetaBanner = ({ isMobile }) => {
  return(
    <aside className="banner-wrapper">
      <div className={"beta-banner"}>
        <div className={"banner-text text-bold"}>
          Beta
        </div>
      </div>
    </aside>
  )
}

BetaBanner.propTypes = {
  isMobile: PropTypes.bool.isRequired,
}

export default BetaBanner
