package Prototype;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "recipes")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Recipes {
    @Id
    private ObjectId id;
    private String name;
    private String description;
    private List<Ingredients> ingredients;
}
