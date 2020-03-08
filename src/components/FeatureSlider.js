import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import './FeatureSlider.scss';

import * as utils from "../utils";

/**
 * Known supported filetypes:
 *   - image/jpeg
 */
const ImageSlide = ({ src, altText }) => (
    <img
      src={src}
      alt={altText}
      onError={utils.handleMissingImage}
    />
)
ImageSlide.propTypes = {
  src: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
}

/**
 * Known supported filetypes:
 *   - audio/mp3
 */
const AudioSlide = ({ src, type }) => (
    <audio controls width="100%">
      <source src={src} type={type} />
      Sorry, your browser does not support embedded audio files.
    </audio>
)

/**
 * Known supported filetypes:
 *   - video/webm
 *   - video/mp4
 */
const VideoSlide = ({ src, type }) => (
    <video controls width="100%">
      <source src={src} type={type} />
      Sorry, your browser does not support embedded video files.
    </video>
)

const FeatureSlider = ({ slides }) => {
  /**
   * @see https://react-slick.neostack.com/docs/api
   */
  const sliderSettings = {
    dots: true,
    infinite: true,
    lazyLoad: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: false,
  };

  const UNSUPPORTED_FILETYPES = [
    'video/avi',
    'video/quicktime',
  ]

  return (
    <div className="detailSlideshow" aria-label="Images of the artwork">
      <div>
        <Slider {...sliderSettings}>
          { slides.map( data => {
            if (UNSUPPORTED_FILETYPES.includes(data.type)) {
              return null
            }
            // For other formats, though we might discover more unsupported formats.
            switch (data.type.split('/')[0]) {
              case 'image':
                return <ImageSlide src={data.mediaSrc} altText={data.mediaAltText} />
              case 'audio':
                return <AudioSlide src={data.mediaSrc} type={data.type} />
              case 'video':
                return <VideoSlide src={data.mediaSrc} type={data.type} />
              case 'missing':
              case 'unsupported':
              default:
                // TODO: Add filler for "unsupported type"
                return null
            }
          })}
        </Slider>
      </div>
    </div>
  )
}
FeatureSlider.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.object)
}

export default FeatureSlider;
