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

  isFeaturePoint = (feature) => {
    return (
      feature !== null &&
      feature.geometry.type === "Point"
    )
  }

  render() {
    const { feature, onClose } = this.props;
    const isFeaturePoint = this.isFeaturePoint(feature)

    return (
      <div id="detail" className={feature ? 'open' : 'closed'} aria-hidden={feature ? 'false' : 'true'}>
        <BackToListViewButton onClick={onClose} ref={this.buttonRef} />
        {
          feature &&
          <div className="detail-view">
            {
              isFeaturePoint ?
              <div>
                <FeatureSlider slides={this.getMediaData(feature)} />
                <div id="detail-text" className="p-4">
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
                    <table>
                      <tbody>
                        {
                          feature.properties['partner'] &&
                          <tr>
                            <th>Partner organization</th>
                            <td>{feature.properties['partner']}</td>
                          </tr>
                        }
                        <tr>
                          <th>Ward</th>
                          <td>{feature.properties['ward']}</td>
                        </tr>
                        <tr>
                          <th>Program</th>
                          <td>{feature.properties['prgrm']}</td>
                        </tr>
                        <tr>
                          <th>Year</th>
                          <td>{feature.properties['yr']}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div> :
              <div>
                <h3 className='detail-ward'>
                  Ward {feature.properties['AREA_L_CD']} <br/>
                  {feature.properties['AREA_NAME']}
                </h3>
              </div>
            }
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
