package Prototype;
import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import static com.mongodb.client.model.Filters.all;
import static com.mongodb.client.model.Filters.in;

@SpringBootApplication
@RestController
@RequestMapping("/recipes")
public class RecipeFinderApplication {

    private final MongoCollection<Document> recipeCollection;
    private final MongoCollection<Document> hardcodeCollection;

    public RecipeFinderApplication() {
        String uri = "mongodb+srv://sepp:recipes@recipes.jgfsn.mongodb.net"; 
        MongoClient mongoClient = MongoClients.create(uri);
        MongoDatabase database = mongoClient.getDatabase("recipes");
        this.recipeCollection = database.getCollection("recipes");
        this.hardcodeCollection = database.getCollection("hardcode");
    }

    public static void main(String[] args) {
        SpringApplication.run(RecipeFinderApplication.class, args);
    }

    @PostMapping("/find")
    public List<Document> findRecipes(@RequestBody List<String> ingredients) {
        // Build query to check if all provided ingredients are in the recipe
        Bson filter = all("ingredients.name", ingredients);

        // Query the database and return matching recipes
        return recipeCollection.find(filter).into(new java.util.ArrayList<>());
    }
    @GetMapping("/findUsingHardcode")
    public List<Document> findUsingHardcode() {
        List<String> hardcodedIngredients = new ArrayList<>();
        for (Document doc : hardcodeCollection.find()) {
            hardcodedIngredients.add(doc.getString("name"));
        }

        Bson filter = all("ingredients.name", hardcodedIngredients);
        List<Document> recipes = new ArrayList<>();

        for (Document recipe : recipeCollection.find(filter)) {
            List<Document> recipeIngredients = recipe.getList("ingredients", Document.class);
            List<Document> missingIngredients = new ArrayList<>();

            for (Document ingredient : recipeIngredients) {
                String ingredientName = ingredient.getString("name");
                if (!hardcodedIngredients.contains(ingredientName)) {
                    missingIngredients.add(ingredient);
                }
            }

            recipe.put("missingIngredients", missingIngredients);
            recipes.add(recipe);
        }
        return recipes;
    }
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("http://localhost:5173");
            }
        };
    }
}

