package Prototype;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "ingredients")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Ingredients {
    @Id
    private ObjectId id;
    private String name;
    private String description;
    private String unit;
}
