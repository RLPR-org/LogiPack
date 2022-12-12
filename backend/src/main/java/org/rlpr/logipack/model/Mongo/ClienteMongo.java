package org.rlpr.logipack.model.Mongo;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import org.springframework.data.annotation.Id;


@Data
@Document("clientes")
public class ClienteMongo {

    @Id
    private String _id;
    private int cliente;
    private String name;
    private String email;
    private List<NotificacaoCliente> notifications;

    public ClienteMongo(int cliente, String name, String email) {
        this.cliente = cliente;
        this.name = name;
        this.email = email;
        this.notifications = new ArrayList<>();
    }
    
}
