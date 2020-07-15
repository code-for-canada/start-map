import React from 'react';
import PropTypes from "prop-types";
import ReactGA from 'react-ga';
import LazyLoad from 'react-lazyload';
import * as utils from "../utils";


const FeatureListItem = ({ uid, media, artistName, onClick, address, year, isMobile }) => {
  const handleClick = () => {
    ReactGA.event({
      category: 'Artwork',
      action: 'View details',
      label: artistName,
      value: uid,
    })

    onClick(uid)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleClick()
    }
  }

  return (
    <li className='lv-tile' onClick={handleClick} onKeyPress={handleKeyPress} tabIndex={0} role="button">
      <div className='lv-tile-pic'>
        <LazyLoad height={100} offset={30} resize={true} overflow={isMobile} scrollContainer={isMobile ? null : ".nav-wrap"}>
          { /* eslint-disable-next-line jsx-a11y/img-redundant-alt */ }
          <img
            aria-label="Thumbnail Preview"
            alt="Photo of artwork"
            className="list-img"
            src={utils.getCoverImage(media)}
            onError={utils.handleMissingImage}
          />
        </LazyLoad>
      </div>
      <div className="lv-tile-txt">
        <h3 className='tileArtist'>
          {artistName}
        </h3>
        <p className='tileAddress'>
          {address}
        </p>
        <p className='tileYear'>
          {year}
        </p>
      </div>
    </li>
  );
}


FeatureListItem.propTypes = {
  uid: PropTypes.number,
  media: PropTypes.arrayOf(PropTypes.object),
  artistName: PropTypes.string,
  address: PropTypes.string,
  year: PropTypes.number,
  onClick: PropTypes.func,
}

FeatureListItem.defaultProps = {
  uid: 0,
  media: [],
}

export default FeatureListItem