import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import { forceCheck } from 'react-lazyload';
import FeatureListItem from './FeatureListItem';


const FeatureList = ({ features, onItemClick }) => {
  useEffect(() => {
    forceCheck()
  });

  return (
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
        />
      )}
    </ul>
  );
}


FeatureListItem.propTypes = {
  features: PropTypes.arrayOf(PropTypes.object),
  onItemClick: PropTypes.func,
}

export default FeatureList