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
    private List<EncomendaEstadoMongo> history;

    public EncomendaMongo(int encomenda) {
        this.encomenda = encomenda;
        history = new ArrayList<>();
    }

    public void initalizeHistory(String timestamp) {
        EncomendaEstadoMongo initialState = new EncomendaEstadoMongo();
        initialState.setEncomenda(this.encomenda);
        initialState.setEstado("REGISTADA");
        initialState.setTimestamp(timestamp);
        initialState.setConfirmacao(false);
        this.history.add(initialState);
    }

    public int getEncomenda() {
        return encomenda;
    }

    public List<EncomendaEstadoMongo> getHistory() {
        return history;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public void setHistory(List<EncomendaEstadoMongo> history) {
        this.history = history;
    }

    public void setEncomenda(int encomenda) {
        this.encomenda = encomenda;
    }


}
