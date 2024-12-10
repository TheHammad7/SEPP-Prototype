import recipes from './RecipeList';

export const mapRecipes = (backendRecipes) => {
  return backendRecipes.map((backendRecipe) => {
    const staticDetails = recipes.find(
      (recipe) => recipe.title === backendRecipe.title
    );
    return {
      ...backendRecipe, // Backend data (name, ingredients, etc.)
      ...staticDetails, // Frontend styling (image, backgroundSize, etc.)
    };
  });
};
