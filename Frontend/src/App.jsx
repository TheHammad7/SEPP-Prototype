import './App.css';
import FilterButton from './components/FilterButton';
import RecipeCard from "./components/RecipeCard";
import recipes from './components/RecipeList'; // Default static recipes
import { mapRecipes } from './components/RecipeMapper'; // Import the mapping function

import MenuIcon from './assets/menu-icon.svg';
import SSHLogo from './assets/ssh-logo.svg';
import RecipeAppIcon from './assets/recipe-app-icon.svg';
import FilterIcon from './assets/filter-icon.svg';

import { useState } from 'react';

function App() {
  const [filteredRecipes, setFilteredRecipes] = useState(recipes); // Maintain state for recipes

  const handleMenuClick = (event) => {
    event.currentTarget.blur(); // Removes focus from the button
  };

  const fetchRecipes = async () => {
    try {
      const response = await fetch("http://localhost:8080/recipes/findUsingHardcode");
      const backendRecipes = await response.json();

      // Map backend data with static database (in RecipeList.jsx)
      const adaptedRecipes = mapRecipes(backendRecipes);

      setFilteredRecipes(adaptedRecipes); // Update state with the adapted recipes
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (

    <div className="MacbookAir1">

      <div className="PageHeader"> 

        <div className='Banner'>
          <button className="Menu" onClick={handleMenuClick}>
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
          <FilterButton label="What's in my fridge?" onClick={fetchRecipes} />
          <FilterButton label="Ingredient selection" />
          <FilterButton label="Clear all filters" onClick={() => setFilteredRecipes(recipes)} />
        </div>
      </div>

      <div className="RecipeGrid">
        {filteredRecipes.map((recipe, index) => {
        // Print out debugging info to the console
        if (index === 0) {
          console.group("Debugging Filtered Recipes");
          console.log("Filtered Recipes Array:", filteredRecipes);

          const ids = filteredRecipes.map((r) => r.id);
          console.log("All IDs:", ids);

          const duplicateIds = ids.filter((id, idx) => ids.indexOf(id) !== idx);
          console.log("Duplicate IDs:", duplicateIds);

          console.groupEnd();
        }

        console.group(`Rendering Recipe ${recipe.title}`);
        console.log("Recipe ID:", recipe.id);
        console.log("Recipe Object:", recipe);
        console.groupEnd();

        return (
          <RecipeCard
            key={recipe.key}
            title={recipe.title}
            cookingTime={recipe.cookingTime}
            image={recipe.image}
            backgroundPosition={recipe.backgroundPosition}
            backgroundSize={recipe.backgroundSize}
          />
        );
      })}
    </div>

    </div>
  );

}

export default App;
