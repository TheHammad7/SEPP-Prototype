package Prototype;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.mongodb.client.*;
import org.bson.Document;
import org.bson.conversions.Bson;

import java.util.List;

import static com.mongodb.client.model.Filters.in;

@SpringBootApplication
@RestController
@RequestMapping("/recipes")
public class RecipeFinderApplication {

    private final MongoCollection<Document> recipeCollection;

    public RecipeFinderApplication() {
        String uri = "mongodb+srv://sepp:recipes@recipes.jgfsn.mongodb.net"; 
        MongoClient mongoClient = MongoClients.create(uri);
        MongoDatabase database = mongoClient.getDatabase("recipes");
        this.recipeCollection = database.getCollection("recipes");
    }

    public static void main(String[] args) {
        SpringApplication.run(RecipeFinderApplication.class, args);
    }

    @PostMapping("/find")
    public List<Document> findRecipes(@RequestBody List<String> ingredients) {
        System.out.println("Received Ingredients: " + ingredients);
        // Build query to check if all provided ingredients are in the recipe
        Bson filter = in("ingredients.name", ingredients);
        
        // Query the database and return matching recipes
        return recipeCollection.find(filter).into(new java.util.ArrayList<>());
    }
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("http://localhost:3000");
            }
        };
    }
}

