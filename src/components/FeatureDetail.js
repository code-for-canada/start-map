import React, { Component } from "react";
import PropTypes from "prop-types";
import FeatureSlider from "./FeatureSlider";

import placeholder from '../assets/placeholder.jpg';

class FeatureDetail extends Component {
  static propTypes = {
    /** Feature data object from map data. */
    feature: PropTypes.object.isRequired,
  }

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
  getMediaData = (ftr) => {
    let mediaData = [];
    if (ftr.getGeometry().getType() === "Point") {
      if (ftr.getProperty('media')) {
        mediaData = ftr.getProperty('media').map( mediaItem => ({
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
    const { feature } = this.props;

    const isFeaturePoint = () => {
      return (
        feature !== null &&
        feature.getGeometry().getType() === "Point"
      )
    }

    const renderArtworkText = () => (
      <React.Fragment>
        <h3 className='detailArtist'>
          {feature.getProperty('artist')}
        </h3>
        <h5 className='detailAddress'>
          {feature.getProperty('address')}
        </h5>
        <h5 className='detailYear'>
          Created in {feature.getProperty('yr')}
        </h5>
        <br/>
        <p className='detailOrg'>
          <strong>Partner Organization:</strong> {feature.getProperty('partner')}
        </p>
        <p className='detailDesc'>
          <strong>Description:</strong> {feature.getProperty('description')}
        </p>
        <p className='detailWard'>
          <strong>Ward:</strong> {feature.getProperty('ward')}
        </p>
        <p className='detailPrgrm'>
          <strong>Program:</strong> {feature.getProperty('prgrm')}
        </p>
      </React.Fragment>
    )

    const renderArtworkDetails = () => {
      return (
        <div>
          <FeatureSlider slides={this.getMediaData(feature)} />
          <div id="detailText">
            { renderArtworkText() }
          </div>
        </div>
      )
    }

    const renderWardDetails = () => {
      return (
        <div>
          <h3 className='detailWard'>
            Ward {feature.getProperty('AREA_L_CD')} <br/>
            {feature.getProperty('AREA_NAME')}
          </h3>
        </div>
      )
    }

    return (
      <div className="detailView">
        { isFeaturePoint() ? renderArtworkDetails() : renderWardDetails() }
      </div>
    )
  }
}
export default FeatureDetail;
