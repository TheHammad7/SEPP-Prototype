import recipes from './RecipeList';

export const mapRecipes = (backendRecipes) => {
  return backendRecipes.map((backendRecipe) => {
    // Match recipe details by `name` from backend and `title` from RecipeList
    const staticDetails = recipes.find(
      (recipe) => recipe.title === backendRecipe.name
    );

    return {
      ...backendRecipe, // Include all backend data
      ...staticDetails, // Merge with styling details + info from RecipeList.jsx (image, backgroundPosition, etc.)
    };
  });
};
