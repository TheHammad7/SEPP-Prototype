import React, { useState } from "react";
import "./FilterButton.css";
import axios from 'axios'



const FilterButton = ({ label, onClick, onRecipesUpdate }) => {
  const [isActive, setIsActive] = useState(false);
  const [recipeSearches, setRecipes] = useState([])
  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:8080/recipes/findUsingHardcode')
      const filteredRecipes = response.data.map((recipe) => ({
        name: recipe.name,
        description: recipe.description,
        missingIngredients: recipe.missingIngredients.map((ing) => ing.name),
      }));
  
      setRecipes(filteredRecipes);
      
      if (onRecipesUpdate) {
        onRecipesUpdate(filteredRecipes);
      }
    } catch (err) {
      alert ("Error getting recipes")
      console.error(err);
    }
  };

  const handleClick = () => {
    setIsActive(!isActive); // Toggle active state
    if (label == "What's in my fridge?") handleSearch(); // Call optional onClick prop
    if (label == "Clear all filters") onClick();
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
