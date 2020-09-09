import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import { forceCheck } from 'react-lazyload';
import FeatureListItem from './FeatureListItem';


const FeatureList = ({ features, onItemClick, isMobile, activeFeature }) => {
  useEffect(() => {
    forceCheck()
  });

  return (
    <div id="results" className="list-container" role="region" aria-live="polite">
      <p className="text-right">{features.length} Results</p>
      <ul id="list">
        {features.map(feature =>
          <FeatureListItem
            key={feature.properties.uid}
            feature={feature}
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