import React from 'react';
import PropTypes from "prop-types";
import MobileMapPopupArtwork from './MobileMapPopupArtwork'
import MobileMapPopupWard from './MobileMapPopupWard'
import { getCoverImage } from '../utils';

/**
 * Renders the little hovering popup at the bottom of mobile map view, in
 * which ward and artwork data are shown when feature is clicked/active.
 */
const MobileMapPopup = ({ onClick, activeFeature }) => {
  if (typeof activeFeature.getProperty === 'undefined' ) { return null }

  const getFeatureCoverImageSrc = () => {
    if (activeFeature.getProperty('media')) {
      return getCoverImage(activeFeature.getProperty('media'))
    }
    return ''
  }

  // Only wards have this property.
  const isArtwork = (!activeFeature.getProperty('AREA_L_CD'))

  return (
    <div id="MobileMapPopUp" onClick={onClick}>
      { isArtwork ? (
        <MobileMapPopupArtwork
          imgSrc={getFeatureCoverImageSrc()}
          year={activeFeature.getProperty('yr')}
          artist={activeFeature.getProperty('artist')}
          address={activeFeature.getProperty('address')}
        />
      ) : (
        <MobileMapPopupWard
          wardNumber={activeFeature.getProperty('AREA_L_CD')}
          wardName={activeFeature.getProperty('AREA_NAME')}
        />
      )}
    </div>
  )
}

MobileMapPopup.propTypes = {
  onClick: PropTypes.func.isRequired,
  activeFeature: PropTypes.object,
}

MobileMapPopup.defaultProps = {
  activeFeature: {},
}

export default MobileMapPopup