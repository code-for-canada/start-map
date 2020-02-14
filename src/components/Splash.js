import React, { Component } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";

class Splash extends Component {
  static propTypes = {
    click: PropTypes.func,
    mobile: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.click()
  }

  render () {
    const settings = {
      dots: true,
      infinite: false,
      lazyLoad: false,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true
    };
    let splash;
    if (this.props.mobile === true){
      splash =
        <div className="splash-background">
        <div className="splash-mobile">
        <div className="splash-head">
        <h3>Welcome to</h3>
        <h1>StreetARToronto – The Map!</h1>
        <h6>A joint project of StreetARToronto (StART) and Civic Hall Toronto</h6>
        </div>
        <Slider {...settings}>
        <div>
        <p>Toronto is home to some of the best mural, street and graffiti artists and art in the world. These artists and artworks have transformed Toronto&#39;s public streets, laneways and parks into a city-wide art gallery!</p>
        </div>
        <div>
        <p>This map based app will help you explore the amazing street art located throughout the city. The current database provides a sampling of murals created as part of the
      StreetARToronto suite of programs from 2012 to 2018. In addition to identifying the
      artist and arts organization responsible for painting the mural the database describes
      the stories and themes behind each unique and beautiful artwork. Individually and
      collectively these murals are designed to celebrate the City of Toronto motto &quot;Diversity Our Strength&quot; and foster a greater sense of belonging among all.</p>
        </div>
        <div>
        <p>Filters allow you to search by any combination of Year and/or Ward. Additional filters will be installed and the database is being updated regularly to add more artwork, so check back often!</p>
        </div>
        </Slider>

        <div className="splash-button-wrap">
        <button aria-label="Close" onClick={this.handleClick} className="splash-btn btn btn-light">
        Get Started!
        </button>
        </div>

        </div>
        </div>
    }
    else {
      splash = <div className="splash-background"><div className="splash">
        <div className="splash-head">
        <h3>Welcome to</h3>
        <h1>StreetARToronto – The Map!</h1>
        <h6>A joint project of StreetARToronto (StART) and Civic Hall Toronto</h6>
        </div>
        <div className="splash-body">
        <p>Toronto is home to some of the best mural, street and graffiti artists and art in the world. These artists and artworks have transformed Toronto&#39;s public streets, laneways and parks into a city-wide art gallery!</p>
        <p>This map based app will help you explore the amazing street art located throughout the city. The current database provides a sampling of murals created as part of the
      StreetARToronto suite of programs from 2012 to 2018. In addition to identifying the
      artist and arts organization responsible for painting the mural the database describes
      the stories and themes behind each unique and beautiful artwork. Individually and
      collectively these murals are designed to celebrate the City of Toronto motto &quot;Diversity Our Strength&quot; and foster a greater sense of belonging among all.</p>
        <p>Filters allow you to search by any combination of Year and/or Ward. Additional filters will be installed and the database is being updated regularly to add more artwork, so check back often!</p>
        </div>
        <div className="splash-button-wrap">
        <button aria-label="Close" onClick={this.handleClick} className="splash-btn btn btn-light">
        Get Started!
        </button>
        </div>

        </div></div>
    }
    return (
      <div className="splash-wrapper">
      {splash}
      </div>

    );
  }
}

export default Splash;
