package org.rlpr.logipack.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.rlpr.logipack.model.Mongo.ClienteMongo;
import org.rlpr.logipack.model.Mongo.NotificacaoCliente;
import org.rlpr.logipack.repository.Mongo.ClienteMongoRepository;
import java.util.ArrayList;
import java.util.List;


@Service
public class ClienteService {

    @Autowired
    private ClienteMongoRepository clienteMongoRepo;


    public List<NotificacaoCliente> getNotificacoesByCliente(int id) {
        return clienteMongoRepo.findByCliente(id).getNotifications();
    }

    
    public void deleteNotificacoesByCliente(int id) {
        ClienteMongo cliente = clienteMongoRepo.findByCliente(id);
        cliente.setNotifications(new ArrayList<>());
        clienteMongoRepo.save(cliente);
    }



}
