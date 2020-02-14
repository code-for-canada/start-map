import React, { Component } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";

class DynamicSlides extends Component {
  // TODO: #ask about ftr prop here.
  static propTypes = {
    slides: PropTypes.array,
    onError: PropTypes.func,
  }

  // TODO: #ask about state here.

  render() {
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
                  onError={this.props.onError}
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
