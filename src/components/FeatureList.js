import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import { forceCheck } from 'react-lazyload';
import FeatureListItem from './FeatureListItem';


const FeatureList = ({ features, onItemClick, isMobile }) => {
  useEffect(() => {
    forceCheck()
  });

  return (
    <div className="list-container">
      <p className="text-right">{features.length} Results</p>
      <ul id="list">
        {features.map(f =>
          <FeatureListItem
            key={f.uid}
            uid={f.uid}
            artistName={f.artist}
            address={f.address}
            year={f.yr}
            media={f.media}
            onClick={onItemClick}
            isMobile={isMobile}
          />
        )}
      </ul>
    </div>
  );
}


FeatureListItem.propTypes = {
  features: PropTypes.arrayOf(PropTypes.object),
  onItemClick: PropTypes.func,
}

export default FeatureList