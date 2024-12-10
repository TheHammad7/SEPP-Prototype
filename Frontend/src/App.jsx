import './App.css'
import FilterButton from './components/FilterButton';
import RecipeCard from "./components/RecipeCard";
import recipes from './components/RecipeList';

import MenuIcon from './assets/menu-icon.svg';
import SSHLogo from './assets/ssh-logo.svg';
import RecipeAppIcon from './assets/recipe-app-icon.svg';
import FilterIcon from './assets/filter-icon.svg';

function App() {

  const handleMenuClick = (event) => {
    event.currentTarget.blur(); // Removes focus from the button
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
          <FilterButton label="What's in my fridge?" />
          <FilterButton label="Ingredient selection" />
          <FilterButton label="Clear all filters" />
        </div>
      </div>

      <div className='RecipeGrid'>
        {recipes.map((recipe) => (
        <RecipeCard
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
