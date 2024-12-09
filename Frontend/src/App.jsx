import './App.css'
import FilterButton from './components/FilterButton';
import RecipeCard from "./components/RecipeCard";

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
        <RecipeCard title = "Pancakes" cookingTime={30} />
        <RecipeCard title = "Scrambled Eggs" cookingTime={10} />
        <RecipeCard title = "Spaghetti Bolognese" cookingTime={45} />
        <RecipeCard title = "Caesar Salad" cookingTime={20} />
        <RecipeCard title = "Vegetable Stir Fry" cookingTime={30} />
        <RecipeCard title = "Grilled Cheese Sandwich" cookingTime={15} />
        <RecipeCard title = "Tomato Soup" cookingTime={45} />
        <RecipeCard title = "Chicken Curry" cookingTime={45} />
        <RecipeCard title = "French Toast" cookingTime={30} />
        <RecipeCard title = "Beef Tacos" cookingTime={45} />
        <RecipeCard title = "Mashed Potatoes" cookingTime={30} />
        <RecipeCard title = "Children Alfredo" cookingTime={45} />
        <RecipeCard title = "Apple Pie" cookingTime={60} />
        <RecipeCard title = "Vegetable Soup" cookingTime={45} />
        <RecipeCard title = "Chocolate Cake" cookingTime={60} />
      </div>
    </div>
  );

}

export default App;
