package org.rlpr.logipack.model.Mongo;

import java.util.HashMap;
import java.util.Map;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import lombok.Data;

@Data
@Document("historico")
public class HistoricoTemporal {
    @Id
    private String _id;
    private Map<String, HistoricoMeses> historico_anos;

    public HistoricoTemporal() {
        this.historico_anos = new HashMap<>();
    }

}
