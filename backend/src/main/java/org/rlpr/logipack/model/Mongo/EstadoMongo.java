package org.rlpr.logipack.model.Mongo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("estados")
public class EstadoMongo {

    @Id
    private String id;

    private int encomenda;
    private String estado;
    private String timestamp;

}
