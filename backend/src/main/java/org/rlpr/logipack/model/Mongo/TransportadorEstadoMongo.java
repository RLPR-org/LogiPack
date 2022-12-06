package org.rlpr.logipack.model.Mongo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("transportadores_estados")
public class TransportadorEstadoMongo {

    @Id
    private String id;
    private int transportador;
    private String estado;
    private String timestamp;
    
}

