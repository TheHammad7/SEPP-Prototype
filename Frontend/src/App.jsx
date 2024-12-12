import './App.css';
import FilterButton from './components/FilterButton';
import RecipeCard from "./components/RecipeCard";
import recipes from './components/RecipeList'; // Default static recipes
import { mapRecipes } from './components/RecipeMapper'; // Import the mapping function

import MenuIcon from './assets/menu-icon.svg';
import SSHLogo from './assets/ssh-logo.svg';
import RecipeAppIcon from './assets/recipe-app-icon.svg';
import FilterIcon from './assets/filter-icon.svg';

import { useState, useEffect } from 'react';

function App() {
  const [filteredRecipes, setFilteredRecipes] = useState(recipes); // Maintain state for recipes
  const [animateGrid, setAnimateGrid] = useState(false); // Track animation for the grid
  const [activeButton, setActiveButton] = useState(null); // Track the active button

  const triggerGridAnimation = () => {
    setAnimateGrid(false); // Reset animation
    setTimeout(() => setAnimateGrid(true), 10); // Reapply animation with a delay
  };

  const fetchRecipes = async () => {
    try {
      const response = await fetch("http://localhost:8080/recipes/findUsingHardcode");
      const backendRecipes = await response.json();
      const adaptedRecipes = mapRecipes(backendRecipes);

      setFilteredRecipes(adaptedRecipes);
      triggerGridAnimation(); // Trigger animation
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleFridgeClick = () => {
    if (activeButton !== "fridge") {
      setActiveButton("fridge");
      fetchRecipes(); // Fetch recipes only when activating
    }
  };

  const handleIngredientClick = () => {
    if (activeButton === "fridge") {
      setActiveButton("ingredient");
      
    } else if (activeButton !== "ingredient") {
      setActiveButton("ingredient");
    }
  };

  const clearFilters = () => {
    setActiveButton(null);
    setFilteredRecipes(recipes); // Reset to default recipes
    triggerGridAnimation();
  };

  useEffect(() => {
    triggerGridAnimation(); // Trigger animation on initial load
  }, []); // Run once on load

  return (
    <div className="MacbookAir1">
      <div className="PageHeader">
        <div className='Banner'>
          <button className="Menu" onClick={(event) => event.currentTarget.blur()}>
            <img src={MenuIcon} alt="Menu" className="Menu-icon" />
          </button>
          <img src={SSHLogo} alt="SSH Logo" className="SSHLogo" />
        </div>

        <img src={RecipeAppIcon} alt="Recipe App Icon" className="RecipeIcon" />
        <text className="AppTitle">Student Smart Recipes</text>
      </div>

      <text className="FilterBarTitle">Filter recipes by:</text>
      <div className="FilterBar">
        <div className="FilterButtons">
          <img src={FilterIcon} alt="Filter Icon" className="FilterIcon" />
          <FilterButton
            label="What's in my fridge?"
            isActive={activeButton === "fridge"}
            onClick={handleFridgeClick}
          />
          <FilterButton
            label="Ingredient selection"
            isActive={activeButton === "ingredient"}
            onClick={handleIngredientClick}
          />
          <FilterButton
            label="Clear all filters"
            isActive={false} // Always inactive
            onClick={clearFilters}
          />
        </div>
      </div>

      <div className={`RecipeGrid ${animateGrid ? 'animate-grid' : ''}`}>
        {filteredRecipes.map((recipe, index) => (
          <RecipeCard
            key={recipe.key}
            title={recipe.title}
            cookingTime={recipe.cookingTime}
            image={recipe.image}
            backgroundPosition={recipe.backgroundPosition}
            backgroundSize={recipe.backgroundSize}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
