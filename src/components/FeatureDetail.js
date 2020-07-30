import React from "react";
import PropTypes from "prop-types";
import FeatureSlider from "./FeatureSlider";
import { BackToListViewButton } from './Buttons'

import placeholder from '../assets/img/placeholder.jpg';

class FeatureDetail extends React.Component {
  /**
   * @typedef {Object} ImageData
   * @property {number} key -
   * @property {string} img - A string referencing an image URL.
   * @property {string} alt - Alt text for describing image.
   */

  /**
   * Return an array of image data objects from a feature object.
   *
   * @param {Feature} ftr - A feature object representing map data.
   * @returns {Array} - An array of image data objects.
   */

  buttonRef = React.createRef()

  componentDidUpdate(prevProps) {
    if (!prevProps.feature && this.props.feature) {
      this.buttonRef.current.focus()
    }
  }

  getMediaData = (ftr) => {
    let mediaData = [];
    if (ftr.geometry.type === "Point") {
      if (ftr.properties.media) {
        mediaData = ftr.properties.media.map( mediaItem => ({
          type: mediaItem.type,
          mediaSrc: mediaItem.thumbnails ? mediaItem.thumbnails.large.url : mediaItem.url,
          mediaAltText: "Photo of artwork.",
        }))
      } else {
        mediaData = [{
          type: 'image/',
          mediaSrc: placeholder,
          mediaAltText: "Image not available.",
        }]
      }
    }
    return mediaData;
  }


  render() {
    const { feature, onClose } = this.props;

    return (
      <div id="detail" className={feature ? 'open' : 'closed'} aria-hidden={feature ? 'false' : 'true'}>
        <BackToListViewButton onClick={onClose} ref={this.buttonRef} />
        {
          feature &&
          <div className="detail-view">
            <FeatureSlider slides={this.getMediaData(feature)} />
            <div id="detail-text" className="p-5">
              <h3 className='detail-artist'>
                {feature.properties['artist']}
              </h3>
              <p className='detail-address'>
                {feature.properties['address']}
              </p>
              <br/>
              <p className='detail-description'>
                {feature.properties['description']}
              </p>
              <br/>
              <div className="more-info">
                <div className="grid">
                  {
                    feature.properties['partner'] &&
                    <div className="row pt-1 pb-1">
                      <div className="pr-1">Partner organization</div>
                      <div>{feature.properties['partner']}</div>
                    </div>
                  }
                  <div className="row pt-1 pb-1">
                    <div className="pr-1">Ward</div>
                    <div>{feature.properties['ward']}</div>
                  </div>
                  <div className="row pt-1 pb-1">
                    <div className="pr-1">Program</div>
                    <div>{feature.properties['prgrm']}</div>
                  </div>
                  <div className="row pt-1 pb-1">
                    <div className="pr-1">Year</div>
                    <div>{feature.properties['yr']}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }

}

FeatureDetail.propTypes = {
  /** Feature data object from map data. */
  feature: PropTypes.object,
}

FeatureDetail.defaultProps = {
  feature: null
}

export default FeatureDetail;
