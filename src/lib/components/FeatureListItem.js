import React from 'react';
import PropTypes from "prop-types";
import ReactGA from 'react-ga';
import LazyLoad from 'react-lazyload';
import * as utils from "../utils";


const FeatureListItem = ({ feature, onClick, isMobile, activeFeature }) => {
  const { uid=0, year, artist, title, media=[], address } = feature.properties;

  const handleClick = () => {
    ReactGA.event({
      category: 'Artwork',
      action: 'View details',
      label: artist,
      value: uid,
    })

    onClick(feature.index)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleClick()
    }
  }


  return (
    <li
      className='lv-tile'
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      tabIndex={0}
      role="button"
      aria-expanded={activeFeature && (activeFeature.properties.uid === uid) ? 'true' : 'false'}
      aria-controls='detail'
      id={uid}
    >
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
        <h3 className='tileTitle mb-1'>
          {title}
        </h3>
        {artist &&
          <p className='mb-1'>
            {artist}
          </p>
        }
        <p className='mb-1 text-small'>
          {address}
        </p>
        <p className='text-muted text-small'>
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
