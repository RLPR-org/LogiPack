package org.rlpr.logipack.model.Mongo;

import java.util.HashMap;
import java.util.Map;

import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document("historico_temporal")
public class HistoricoTemporal {
    private Map<String, HistoricoMeses> historico_anos;

    public HistoricoTemporal() {
        this.historico_anos = new HashMap<>();
    }

}
