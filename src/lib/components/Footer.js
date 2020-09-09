import React from "react";
import PropTypes from "prop-types";
import {
  MobileListToggleButton,
  MobileFilterViewButton,
} from "./Buttons";
import Filters from './Filters';

const Footer = ({ isMobile, isFiltered, viewType, toggleListViewMobile, toggleFilters, showFilters, ...rest }) => {
  if (!isMobile) {
    return null;
  }

  return(
    <footer className="footer">
      <div className="nav-items">
        <MobileListToggleButton onClick={toggleListViewMobile} isList={viewType === "list"}/>
        <MobileFilterViewButton onClick={toggleFilters} isFiltered={isFiltered} showFilters={showFilters} />
      </div>
      <div className={`filter-menu mobile-${showFilters ? 'open' : 'closed'}`}>
        <Filters {...rest} />
      </div>
    </footer>
  )
}

Footer.propTypes = {
  isMobile: PropTypes.bool.isRequired,
}

export default Footer
