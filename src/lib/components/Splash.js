import React from "react";
import PropTypes from "prop-types";

const styles = {
  display: 'block',
  position: 'absolute',
  background: 'rgba(52,58,64,.5)',
  width: '100%',
  height: '100%',
  zIndex: 2,
}

const Splash = ({ openSplash, closeSplash, isMobile, showSplash }) => {

  const visibilityClass = showSplash ? 'open' : 'closed';

  return (
    <React.Fragment>
    <button id="toggle-splash" onClick={openSplash} className={visibilityClass}>?</button>
    <div className={`splash-container ${visibilityClass}`}>
      <div id="splash" className={`shadow-depth ${visibilityClass}`}>
        <button onClick={closeSplash} className="btn btn-light close">&times;</button>
        <div className="content">
          <div className="title text-center">
            <div className="mb-2 text-bold text-blue text-large">Welcome to</div>
            <h1 className="title">StreetARToronto - The Map!</h1>
          </div>
          <p className="text-italic">A joint project of StreetARToronto (StART) and Civic Hall Toronto</p>
          <p>Toronto is home to some of the best mural, street and graffiti artists and art in the world. These artists and artworks have transformed Toronto's public streets, laneways and parks into a city-wide art gallery!</p>
          <p>This map based app will help you explore the amazing street art located throughout the city. The current database provides a sampling of murals created as part of the StreetARToronto suite of programs from 2012 to 2019. In addition to identifying the artist and arts organization responsible for painting the mural, the database describes the stories and themes behind each unique and beautiful artwork.</p>
          <p>Individually and collectively, these murals are designed to celebrate the City of Toronto motto "Diversity Our Strength" and foster a greater sense of belonging among all.</p>
          <p>Filters allow you to search by any combination of Year and/or Ward. Additional filters will be installed and the database is being updated regularly to add more artwork, so check back often!</p>
          <div className="mt-6">
            <button aria-label="Close" onClick={closeSplash} className="splash-btn btn btn-highlight btn-lg">
              Get Started!
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className={`splash-background ${visibilityClass}`} onClick={closeSplash} style={styles} />
    </React.Fragment>
  );
}

Splash.propTypes = {
  onButtonClick: PropTypes.func,
  isMobile: PropTypes.bool,
};

export default Splash;