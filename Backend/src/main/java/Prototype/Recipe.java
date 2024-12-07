package Prototype;

import java.util.List;

public class Recipe {
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
