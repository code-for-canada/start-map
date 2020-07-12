import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";

const Splash = ({ onButtonClick, isMobile }) => {
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
      <div>Welcome to</div>
      <h1 aria-hidden={true} className="logo">StreetARToronto - The Map!</h1>
      <h1 style={{ opacity: 0, height: 0, margin: 0, padding: 0 }} className="logo">Street Art Toronto - The Map</h1>
      <h2 style={{}}>A joint project of StreetARToronto (StART) and Civic Hall Toronto</h2>
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
        {bodyText.map( (para, i) => (
          <div key={i}><p>{para}</p></div>
        ))}
      </Slider>
    } else {
      return <div className="splash-body">
        {bodyText.map( (para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    }
  }

  const renderButton = () => (
    <div className="splash-button-wrap">
      <button aria-label="Close" onClick={onButtonClick} className="splash-btn btn btn-light">
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

Splash.propTypes = {
  onButtonClick: PropTypes.func,
  isMobile: PropTypes.bool,
};

export default Splash;
