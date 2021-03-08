import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import { forceCheck } from 'react-lazyload';
import FeatureListItem from './FeatureListItem';


const FeatureList = ({ allFeatures, features = [], featuresNew = [], onItemClick, isMobile, activeFeature }) => {
  useEffect(() => {
    forceCheck()
  });

  return (
    <div id="results" className="list-container" role="region" aria-live="polite">
      <p className="text-right">{featuresNew.length} Results</p>
      <ul id="list">
        {featuresNew.map(i =>
          <FeatureListItem
            key={allFeatures[i].properties.uid}
            feature={allFeatures[i]}
            onClick={onItemClick}
            isMobile={isMobile}
            activeFeature={activeFeature}
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
