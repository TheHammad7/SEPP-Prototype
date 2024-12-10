import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

const RecipeFinder = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const ingredientList = ingredients
        .split(',')
        .map((ingredient) =>
          ingredient.trim().split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
        );

      const response = await axios.post('http://localhost:8080/recipes/find', ingredientList, {
        headers: { 'Content-Type': 'application/json' },
      });

      const filteredRecipes = response.data.map((recipe) => ({
        name: recipe.name,
        description: recipe.description,
        missingIngredients: recipe.missingIngredients.map((ing) => ing.name),
      }));

      setRecipes(filteredRecipes);
    } catch (err) {
      setError('Error fetching recipes. Please try again.');
      console.error(err);
    }
  };

  const handleHardcodeSearch = async () => {
    try {
      const response = await axios.get('http://localhost:8080/recipes/findUsingHardcode');

      const filteredRecipes = response.data.map((recipe) => ({
        name: recipe.name,
        description: recipe.description,
        missingIngredients: recipe.missingIngredients.map((ing) => ing.name),
      }));

      setRecipes(filteredRecipes);
    } catch (err) {
      setError('Error fetching recipes using hardcoded ingredients. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h2 className="ssh">SSH</h2>
      </header>
      <h1 className="title">Student Smart Recipes</h1>

      <div className="filterBar">
        <input
          className="searchBox"
          type="text"
          placeholder="Enter ingredients (comma separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <button onClick={handleSearch}>Find Recipes</button>
        <button onClick={handleHardcodeSearch}>Whats in my fridge?</button>
      </div>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      {recipes.length > 0 && (
        <div>
          <h2>Recipes:</h2>
          <ul>
            {recipes.map((recipe, index) => (
              <li key={index}>
                <h3>{recipe.name}</h3>
                <p>Description: {recipe.description}</p>
                {recipe.missingIngredients.length > 0 ? (
                  <div>
                    <h5>Missing Ingredients:</h5>
                    <ul>
                      {recipe.missingIngredients.map((ingredient, i) => (
                        <li key={i}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <h5>No Missing Ingredients!</h5>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const App = () => (
  <div className="App">
    <header className="App-header">
      <RecipeFinder />
    </header>
  </div>
);

export default App;
