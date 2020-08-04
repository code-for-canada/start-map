import React from 'react';
import PropTypes from "prop-types";

/**
 * Component for rendering map popup when active feature geometry is a POLYGON
 * representing a WARD.
 */
const MobileMapPopupWard = ({ wardNumber, wardName }) => {
  return (
    <div className="popup-txt">
      <h5 className='detailWard'>
        Ward {wardNumber} <br/>
        {wardName}
      </h5>
    </div>
  )
}

MobileMapPopupWard.propTypes = {
  wardNumber: PropTypes.number.isRequired,
  wardName: PropTypes.string.isRequired,
}

export default MobileMapPopupWard