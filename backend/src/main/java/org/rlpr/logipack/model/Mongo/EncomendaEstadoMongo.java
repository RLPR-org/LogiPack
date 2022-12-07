package org.rlpr.logipack.model.Mongo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("encomenda_estados")
public class EncomendaEstadoMongo {

    @Id
    private String id;

    private int encomenda;
    private String estado;
    private String timestamp;
    private boolean confirmacao;

}
