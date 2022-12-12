package org.rlpr.logipack.model.Mongo;

import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document("cliente_notificacoes")
public class NotificacaoCliente {
    private int encomendaId;
    private String message;
    private String timestamp; 

    public NotificacaoCliente(int encomendaId, String message, String timestamp) {
        this.encomendaId = encomendaId;
        this.message = message;
        this.timestamp = timestamp;
    }
}

