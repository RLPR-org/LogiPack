package org.rlpr.logipack.model.Mongo;

import java.util.HashMap;
import java.util.Map;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import java.util.List;
import lombok.Data;

@Data
@Document("historico")
public class HistoricoTemporal {
    @Id
    private String _id;
    private Map<String, Map<String, List<Integer>>> history;

    public HistoricoTemporal() {
        this.history = new HashMap<>();
    }

}
