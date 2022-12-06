package org.rlpr.logipack.model.Mongo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;
import java.util.List;


@Document("transportadores")
public class TransportadorMongo {

    @Id
    private String _id;
    private int transportador;
    private List<TransportadorEstadoMongo> history;


    public TransportadorMongo(int transportador) {
        this.transportador = transportador;
        history = new ArrayList<>();
    }


    public List<TransportadorEstadoMongo> getHistory() {
        return history;
    }

    public int getTransportador() {
        return transportador;
    }

    public String get_id() {
        return _id;
    }

    public void setHistory(List<TransportadorEstadoMongo> history) {
        this.history = history;
    }

    public void setTransportador(int transportador) {
        this.transportador = transportador;
    }

    public void set_id(String _id) {
        this._id = _id;
    }
    
}

