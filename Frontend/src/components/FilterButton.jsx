import React from "react";
import "./FilterButton.css";

const FilterButton = ({ label, isActive, onClick }) => {
  return (
    <button
      className={`FilterButton ${isActive ? "active" : ""}`}
      onClick={onClick} // Use the handler passed from App.jsx
    >
      {label}
    </button>
  );
};

export default FilterButton;

