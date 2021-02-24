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
          <ul className="splash-footer mt-6">
            <li><a href="https://www.toronto.ca/services-payments/streets-parking-transportation/enhancing-our-streets-and-public-realm/streetartoronto/" target="_blank" rel="noreferrer noopener">Website</a></li>
            <li><a href="https://www.youtube.com/playlist?list=PLp11YxteHNp1OVLdlHyA7QEc2bjCADGqJ" target="_blank" rel="noreferrer noopener">YouTube</a></li>
          </ul>
          <div className="mt-6">
            <button aria-label="Close" onClick={closeSplash} className="splash-btn btn btn-highlight btn-lg">
              Get Started!
            </button>
          </div>

          <p className="text-muted text-xs mt-6">
            All elements of the website, including, but not limited to, the general design and the content, are protected by copyright. Except as explicitly permitted under another the agreement between StreetARToronto and the Artist, no portion or element of this website or its content may be copied or retransmitted via any means and this website, its content and all related rights shall remain the exclusive property of StreetARToronto or its licensors.
          </p>
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
