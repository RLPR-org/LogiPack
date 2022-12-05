package org.rlpr.logipack.model.Mongo;

import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("encomendas")
public class EncomendaMongo {
    
    @Id
    private String id;
    private List<EstadoMongo> history;

}
