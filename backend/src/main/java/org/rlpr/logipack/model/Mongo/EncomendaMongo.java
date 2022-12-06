package org.rlpr.logipack.model.Mongo;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document("encomendas")
public class EncomendaMongo {
    
    @Id
    private String _id;
    private int encomenda;
    private List<EstadoMongo> history;

    public EncomendaMongo(int encomenda) {
        this.encomenda = encomenda;
        history = new ArrayList<>();
    }

    public int getEncomenda() {
        return encomenda;
    }

    public List<EstadoMongo> getHistory() {
        return history;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public void setHistory(List<EstadoMongo> history) {
        this.history = history;
    }

    public void setEncomenda(int encomenda) {
        this.encomenda = encomenda;
    }

}
