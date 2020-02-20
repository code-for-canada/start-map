import React, { Component } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";

class Splash extends Component {
  static propTypes = {
    onButtonClick: PropTypes.func,
    isMobile: PropTypes.bool,
  };

  handleButtonClick = () => {
    this.props.onButtonClick()
  }

  render () {
    const { isMobile } = this.props;

    const splashSettings = {
      dots: true,
      infinite: false,
      lazyLoad: false,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true
    };

    const renderHeader = () => (
      <div className="splash-head">
        <h3>Welcome to</h3>
        <h1>StreetARToronto – The Map!</h1>
        <h6>A joint project of StreetARToronto (StART) and Civic Hall Toronto</h6>
      </div>
    )

    const bodyText = [
      "Toronto is home to some of the best mural, street and graffiti artists and art in the world. These artists and artworks have transformed Toronto's public streets, laneways and parks into a city-wide art gallery!",
      'This map based app will help you explore the amazing street art located throughout the city. The current database provides a sampling of murals created as part of the StreetARToronto suite of programs from 2012 to 2018. In addition to identifying the artist and arts organization responsible for painting the mural the database describes the stories and themes behind each unique and beautiful artwork. Individually and collectively these murals are designed to celebrate the City of Toronto motto "Diversity Our Strength" and foster a greater sense of belonging among all.',
      "Filters allow you to search by any combination of Year and/or Ward. Additional filters will be installed and the database is being updated regularly to add more artwork, so check back often!",
    ]

    const renderBody = () => {
      if (isMobile) {
        return <Slider {...splashSettings}>
          {bodyText.map( para => (
            <div><p>{para}</p></div>
          ))}
        </Slider>
      } else {
        return <div className="splash-body">
          {bodyText.map( para => (
            <p>{para}</p>
          ))}
        </div>
      }
    }

    const renderButton = () => (
      <div className="splash-button-wrap">
        <button aria-label="Close" onClick={this.handleButtonClick} className="splash-btn btn btn-light">
          Get Started!
        </button>
      </div>
    )

    return (
      <div className="splash-wrapper">
        <div className="splash-background"><div className={ isMobile ? "splash-mobile" : "splash" }>
          { renderHeader() }
          { renderBody() }
          { renderButton() }
        </div></div>
      </div>
    );
  }
}

export default Splash;
