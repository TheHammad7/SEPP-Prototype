package Prototype;
import java.util.List;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import static com.mongodb.client.model.Filters.all;

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
        // Build query to check if all provided ingredients are in the recipe
        Bson filter = all("ingredients.name", ingredients);

        // Query the database and return matching recipes
        return recipeCollection.find(filter).into(new java.util.ArrayList<>());
    }
}

