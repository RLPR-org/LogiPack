package org.rlpr.logipack.model.Mongo;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;


@Data
@Document("clientes")
public class ClienteMongo {

    private int id;
    private String email;
    private List<NotificacaoCliente> notifications;

    public ClienteMongo(int id, String email) {
        this.id = id;
        this.email = email;
        this.notifications = new ArrayList<>();
    }
    
}
