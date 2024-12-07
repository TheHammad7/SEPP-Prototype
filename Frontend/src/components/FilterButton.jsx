import React, { useState } from "react";
import "./FilterButton.css";

const FilterButton = ({ label, onClick }) => {
  const [isActive, setIsActive] = useState(false);

  // Handle button click
  const handleClick = () => {
    setIsActive(!isActive); // Toggle active state
    if (onClick) onClick(); // Call optional onClick prop
  };

  return (
    <button
      className={`FilterButton ${isActive ? "active" : ""}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default FilterButton;
