import React from "react";
import PropTypes from "prop-types";
import YearDropdown from "./YearDropdown";
import WardDropdown from "./WardDropdown";
import ProgramDropdown from "./ProgramDropdown";
import WardToggle from "./WardToggle";
import SortDropdown from "./SortDropdown";

const BetaBanner = ({ handleSelectYears, handleSelectWards, handleSelectPrograms, setSortType, toggleWardLayer, years, wards, programs, showWardLayer, sortType }) => {
  return(
    <form aria-label="Filter artworks" className="filter-wrap" aria-controls="results">
      <label htmlFor="year">Filter by year</label>
      <YearDropdown onSelect={handleSelectYears} selected={years}/>

      <label htmlFor="ward">Filter by ward</label>
      <WardDropdown onSelect={handleSelectWards} selected={wards}/>

      <label htmlFor="program">Filter by program</label>
      <ProgramDropdown onSelect={handleSelectPrograms} selected={programs}/>

      <label htmlFor="sort">Sort by</label>
      <SortDropdown onSelect={setSortType} sortType={sortType} />

      <label id="ward-layer-label">Ward layer</label>
      <WardToggle onClick={toggleWardLayer} showWardLayer={showWardLayer} />
    </form>
  )
}

BetaBanner.propTypes = {
  handleSelectYears: PropTypes.func.isRequired,
  handleSelectWards: PropTypes.func.isRequired,
  handleSelectPrograms: PropTypes.func.isRequired,
  setSortType: PropTypes.func.isRequired,
  years: PropTypes.array,
  wards: PropTypes.array,
  programs: PropTypes.array,
  showWardLayer: PropTypes.bool,
  sortType: PropTypes.string,
}

export default BetaBanner
