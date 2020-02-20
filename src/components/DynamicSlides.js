import React, { Component } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";

class DynamicSlides extends Component {
  static propTypes = {
    slides: PropTypes.arrayOf(PropTypes.shape({
      imageSrc: PropTypes.string,
      imageAltText: PropTypes.string,
    })),
    onImageError: PropTypes.func,
  }

  render() {
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
      adaptiveHeight: true,
    };

    const renderSlide = (slide, index) => (
      <div key={index}>
        <img
          src={slide.imageSrc}
          onError={this.props.onImageError}
          alt={slide.imageAltText}/>
      </div>
    )

    return (
      <div>
        <Slider {...sliderSettings}>
          { this.props.slides.map(renderSlide) }
        </Slider>
      </div>
    );
  }
}

export default DynamicSlides;
