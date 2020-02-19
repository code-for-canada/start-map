import React, { Component } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";

class DynamicSlides extends Component {
  static propTypes = {
    slides: PropTypes.arrayOf(PropTypes.object),
    onImageError: PropTypes.func,
  }

  render() {
    /**
     * @see https://react-slick.neostack.com/docs/api
     */
    const settings = {
      dots: true,
      infinite: true,
      lazyLoad: false,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
    };

    return (
      <div>
        <Slider {...settings}>
          {this.props.slides.map( (slide) => {
            return (
              <div key={slide.key}>
                <img
                  src={slide.img}
                  onError={this.props.onImageError}
                  alt={slide.alt}/>
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
}

export default DynamicSlides;
