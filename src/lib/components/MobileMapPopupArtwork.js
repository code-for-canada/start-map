import React from 'react';
import PropTypes from "prop-types";
import { handleMissingImage } from "../utils";


/**
 * Component for rendering map popup when active feature geometry is a POINT
 * representing an ARTWORK.
 */
const MobileMapPopupArtwork = ({ imgSrc, year, artist, address }) => {
  return (
    <React.Fragment>
      <div className='popup-pic'>
        { /* eslint-disable-next-line jsx-a11y/img-redundant-alt */ }
        <img alt="Photo of artwork" aria-label="Thumbnail Preview" src={imgSrc} className="list-img" onError={handleMissingImage}/>
      </div>
      <div className="popup-tx ml-2">
        <p>
          <strong className='tileArtist'>
            {artist}
          </strong>
        </p>
        <p className='tileAddress'>
          {address}
        </p>
        <p className='tileYear'>
          Created in {year}
        </p>
      </div>
    </React.Fragment>
  )
}

MobileMapPopupArtwork.propTypes = {
  imgSrc: PropTypes.string,
  artist: PropTypes.string,
  address: PropTypes.string,
  year: PropTypes.number.isRequired,
}

MobileMapPopupArtwork.defaultProps = {
  imgSrc: '',
  artist: '',
  address: '',
}

export default MobileMapPopupArtwork