import React, { Component } from "react";
import Slider from "react-slick";

export default class DynamicSlides extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slides: this.props.slides
    };
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      lazyLoad: false,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true

    };
    return (
      <div>
      <Slider {...settings}>
      {this.props.slides.map(function(slide) {
        return (
          <div key={slide.key}>
          <img src={slide.img} onError={(e)=>{e.target.onerror = null; e.target.src="/imgs/undefined.jpg"}}/>
          </div>
        );
      })}
      </Slider>
      </div>
    );
  }
}
