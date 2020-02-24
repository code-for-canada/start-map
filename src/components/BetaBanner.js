import React, { Component } from "react";
import PropTypes from "prop-types";

class BetaBanner extends Component {
  static propTypes = {
    isMobile: PropTypes.bool.isRequired,
  }

  render () {
    const { isMobile } = this.props;

    return(
      <div className="banner-wrapper">
        <div className={isMobile ? "beta-banner-mobile" : "beta-banner"}>
          <h6 className={isMobile ? "beta-text-mobile" : "beta-text"}>
            Beta
          </h6>
        </div>
      </div>
    )
  }
}

export default BetaBanner
