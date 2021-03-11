import React, { lazy, Suspense } from "react";
import PropTypes from "prop-types";
import mime from "mime-types";
import { BackToListViewButton } from './Buttons'

import placeholder from '../assets/img/placeholder.jpg';

const FeatureSlider = lazy(() => import('./FeatureSlider'))

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
    if (ftr.featured_media.length > 0) {
      mediaData = ftr.featured_media.map( mediaItem => ({
        type: mime.lookup(mediaItem),
        mediaSrc: mediaItem,
        mediaAltText: "Photo of artwork.",
      }))
    } else {
      mediaData = [{
        type: 'image/jpg',
        mediaSrc: placeholder,
        mediaAltText: "Image not available.",
      }]
    }
    return mediaData.reverse();
  }


  render() {
    const { feature, onClose } = this.props;

    return (
      <div id="detail" className={feature ? 'open' : 'closed'} aria-hidden={feature ? 'false' : 'true'}>
        <BackToListViewButton onClick={onClose} ref={this.buttonRef} />
        {
          feature &&
          <div className="detail-view">
            <Suspense fallback={<div className="loading" />}>
              <FeatureSlider slides={this.getMediaData(feature)} />
            </Suspense>
            <div id="detail-text" className="p-5">
              <h3 className='detail-artist mb-3'>
                {feature.title}
              </h3>
              <p className='detail-address mb-2'>
                {feature.artist_details?.preferred_name}
              </p>
              <p className='detail-address mb-2 text-muted'>
                {feature.location_details?.address}
              </p>
              <p className='detail-description mb-2'>
                {feature.description}
              </p>
              <div className="more-info">
                <div className="grid">
                  {
                    feature.organization_details &&
                    <div className="row pt-1 pb-1">
                      <div className="pr-1">Partner organization</div>
                      <div>{feature.organization_details.name}</div>
                    </div>
                  }
                  <div className="row pt-1 pb-1">
                    <div className="pr-1">Ward</div>
                    <div>{feature.ward[0] || ''}</div>
                  </div>
                  <div className="row pt-1 pb-1">
                    <div className="pr-1">Program</div>
                    <div>{feature.program_details?.program_name}</div>
                  </div>
                  <div className="row pt-1 pb-1">
                    <div className="pr-1">Year</div>
                    <div>{feature.year}</div>
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
