package org.rlpr.logipack.model.Mongo;

import org.rlpr.logipack.model.EncomendaEstado;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document("cliente_notificacoes")
public class NotificacaoCliente {
    private int encomendaId;
    private EncomendaEstado newState;
    private String timestamp;

    public NotificacaoCliente(int encomendaId, EncomendaEstado newState, String timestamp) {
        this.encomendaId = encomendaId;
        this.newState = newState;
        this.timestamp = timestamp;
    }
}

