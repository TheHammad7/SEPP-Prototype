package Prototype;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Scanner;

import org.bson.Document;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class RecipeFinder {
    public static void main(String[] args) {
        String uri = "mongodb+srv://sepp:recipes@recipes.jgfsn.mongodb.net";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("recipes");
            MongoCollection<Document> recipeCollection = database.getCollection("recipes");

            try (Scanner scanner = new Scanner(System.in)) {
                System.out.println("Enter the ingredients you have (comma-separated):");
                String input = scanner.nextLine();
                List<String> availableIngredients = Arrays.asList(input.split("\\s*,\\s*"));
            
                // Find and process recipes
                List<Recipe> recipesWithMissingIngredients = findRecipesWithMissingIngredients(recipeCollection, availableIngredients);
            
                // Sort recipes by number of missing ingredients
                recipesWithMissingIngredients.sort(Comparator.comparingInt(Recipe::getMissingIngredientCount));
            
                // Display recipes
                if (recipesWithMissingIngredients.isEmpty()) {
                    System.out.println("No recipes found.");
                } else {
                    System.out.println("Recipes you can make (sorted by least missing ingredients):");
                    for (Recipe recipe : recipesWithMissingIngredients) {
                        System.out.println(recipe.getName() + " (" + recipe.getMissingIngredientCount() + " missing): " +
                                recipe.getMissingIngredients());
                    }
                }
            }            
        }
    }

    public static List<Recipe> findRecipesWithMissingIngredients(MongoCollection<Document> collection, List<String> availableIngredients) {
        List<Recipe> result = new ArrayList<>();

        // Fetch all recipes from the database
        for (Document doc : collection.find()) {
            String recipeName = doc.getString("name");
            List<Document> ingredients = doc.getList("ingredients", Document.class);

            // Extract ingredient names
            List<String> recipeIngredients = new ArrayList<>();
            for (Document ingredient : ingredients) {
                recipeIngredients.add(ingredient.getString("name"));
            }

            // Calculate missing ingredients
            List<String> missingIngredients = new ArrayList<>(recipeIngredients);
            missingIngredients.removeAll(availableIngredients);

            // Add to the result if at least some ingredients match
            if (missingIngredients.size() < recipeIngredients.size()) {
                result.add(new Recipe(recipeName, missingIngredients));
            }
        }

        return result;
    }
}

class Recipe {
    private final String name;
    private final List<String> missingIngredients;

    public Recipe(String name, List<String> missingIngredients) {
        this.name = name;
        this.missingIngredients = missingIngredients;
    }

    public String getName() {
        return name;
    }

    public List<String> getMissingIngredients() {
        return missingIngredients;
    }

    public int getMissingIngredientCount() {
        return missingIngredients.size();
    }
}
