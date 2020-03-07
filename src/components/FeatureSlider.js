import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import './FeatureSlider.scss';

import * as utils from "../utils";

const Slide = ({ data }) => {
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
}
Slide.propTypes ={
  data: PropTypes.object.isRequired,
}
Slide.defaultProps = {
  data: {
    type: 'missing',
  }
}

const ImageSlide = ({ src, altText }) => (
  <div>
    <img
      src={src}
      alt={altText}
      onError={utils.handleMissingImage}
    />
  </div>
)
ImageSlide.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  imgAltText: PropTypes.string.isRequired,
}

const AudioSlide = ({ src, type }) => (
  <div>
    <audio controls>
      <source src={src} type={type} />
      Sorry, your browser does not support embedded audio files.
    </audio>
  </div>
)

const VideoSlide = ({ src, type }) => (
  <div>
    <video controls>
      <source src={src} type={type} />
      Sorry, your browser does not support embedded video files.
    </video>
  </div>
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

  return (
    <div className="detailSlideshow" aria-label="Images of the artwork">
      <div>
        <Slider {...sliderSettings}>
          { slides.map( (slideData) => (
            <Slide data={slideData} />
          ))}
        </Slider>
      </div>
    </div>
  )
}
FeatureSlider.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.object)
}

export default FeatureSlider;
