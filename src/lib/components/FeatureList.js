import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import { forceCheck } from 'react-lazyload';
import * as _ from 'lodash';
import FeatureListItem from './FeatureListItem';


const FeatureList = ({ allFeatures = [], featureIds = [], onItemClick, isMobile, activeFeature }) => {
  useEffect(() => {
    forceCheck()
  });

  return (
    <div id="results" className="list-container" role="region" aria-live="polite">
      <p className="text-right">{featureIds.length} Results</p>
      <ul id="list">
        {featureIds.map(id => {
          console.log(id)
          console.log(allFeatures)
          const feature = _.find(allFeatures, { uid: id })
          return <FeatureListItem
            key={feature.uid}
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
  featureIds: PropTypes.arrayOf(PropTypes.number),
  onItemClick: PropTypes.func,
}

export default FeatureList
