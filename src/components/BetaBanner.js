import React, { Component } from "react";

class BetaBanner extends Component {
  render () {
    return(
      <div className="banner-wrapper">
        <div className={this.props.mobile ? "beta-banner-mobile" : "beta-banner"}>
          <h6 className={this.props.mobile ? "beta-text-mobile" : "beta-text"}>
            Beta
          </h6>
        </div>
      </div>
    )
  }
}

export default BetaBanner
