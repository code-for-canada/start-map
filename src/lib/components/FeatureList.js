import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import { forceCheck } from 'react-lazyload';
import * as _ from 'lodash';
import FeatureListItem from './FeatureListItem';


const FeatureList = ({ allFeatures = [], featuresNew = [], onItemClick, isMobile, activeFeature }) => {
  useEffect(() => {
    forceCheck()
  });

  return (
    <div id="results" className="list-container" role="region" aria-live="polite">
      <p className="text-right">{featuresNew.length} Results</p>
      <ul id="list">
        {featuresNew.map(id => {
          const feature = _.find(allFeatures, { id })
          return <FeatureListItem
            key={feature.properties.uid}
            feature={feature}
            onClick={onItemClick}
            isMobile={isMobile}
            activeFeature={activeFeature}
          />
        })}
      </ul>
    </div>
  );
}


FeatureListItem.propTypes = {
  featuresNew: PropTypes.arrayOf(PropTypes.number),
  onItemClick: PropTypes.func,
}

export default FeatureList
