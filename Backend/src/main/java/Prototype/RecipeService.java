package Prototype;
import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecipeService {
    @Autowired
    private RecipeRepo recipeRepo;

    public List<Recipes> allRecipes(){
        return recipeRepo.findAll();
    }

    public Optional<Recipes> sing(ObjectId id){
        return recipeRepo.findById(id);
    }
}
