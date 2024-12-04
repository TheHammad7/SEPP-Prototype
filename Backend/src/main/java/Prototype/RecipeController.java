package Prototype;
import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping
    public ResponseEntity<List<Recipes>> getallRecipes(){
        return new ResponseEntity<List<Recipes>>(recipeService.allRecipes(),HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Recipes>> getSing(@PathVariable ObjectId id){
        return new ResponseEntity<>(recipeService.sing(id),HttpStatus.OK);
    }
}
