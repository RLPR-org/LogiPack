package org.rlpr.logipack.model.Mongo;

import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("cliente_notificacoes")
public class NotificacaoCliente {
    private int encomendaId;
    private String message;
    private String timestamp; 
}

