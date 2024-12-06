import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

const RecipeFinder = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      // Split the ingredients input into an array and trim any spaces
      const ingredientList = ingredients.split(',').map(ingredient => ingredient.trim().charAt(0).toUpperCase() + ingredient.trim().slice(1).toLowerCase());

      // Send POST request to the backend
      const response = await axios.post('http://localhost:8080/recipes/find',ingredientList,{
        headers:{
          'Content-Type': 'application/json',
        },
      })
      //Filter for missing ingredients only
      const filteredRecipes = response.data.map((recipe) => ({
        name: recipe.name,
        description: recipe.description,
        ingredients: recipe.ingredients.filter(
          (ingredient) => !ingredientList.includes(ingredient.name)
        ),
      }))
      // Update the state with the recipes returned from the server
      setRecipes(filteredRecipes);
    } catch (err) {
      setError('Error fetching recipes. Please try again.');
      console.error(err);
    }
  };
  return (
    <div className="App">
      <header className="header">
        <h2 className='ssh'>SSH</h2>
        
      </header>
      <h1 className='title'>Student Smart Recipes</h1>
      <p style={{fontSize: 30,
      fontWeight: 700,
      left: 0,
      letterSpacing: 0,
      marginLeft: '5%',
      }}>Filter recipes by:</p>
      <body className='filterBar'>
        
        <input className='searchBox'
        type="text"
        placeholder="Enter ingredients (comma separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <button onClick={handleSearch} 
      style={{fontSize: '10px'+ '2vmin',
        width: '30%',
        marginTop:'2%',
        marginBottom:'2%',
        fontSize:32,
        fontWeight: 600,
        textAlign: 'center',
        }}>Find Recipes</button>
        </body>

      {error && <div style={{ color: 'red' }}>{error}</div>}
      
      {recipes.length > 0 && (
        <div>
          <h2>Recipes:</h2>
          <ul>
            {recipes.map((recipe, index) => (
              <li key={index}>
                <h3>{recipe.name}</h3>
                <p>Description: {recipe.description}</p>
                
                {recipe.ingredients.length > 0 ? (
                <ul>
                  <h5>Missing Ingredients:</h5>
                  {recipe.ingredients.map((ingredient, i) => (
                    <li key={i}>{ingredient.name}</li>

                    ))}</ul>
                  
                ):(
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
  function App() {
    return (
      <div className='App'>
        <header className='App-header'>
          <RecipeFinder />
        </header>
      </div>
    );
}

export default App;
