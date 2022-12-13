package org.rlpr.logipack.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.rlpr.logipack.model.*;
import org.rlpr.logipack.model.Mongo.EncomendaEstadoMongo;
import org.rlpr.logipack.model.Mongo.EncomendaMongo;
import org.rlpr.logipack.model.Mongo.NotificacaoCliente;
import org.rlpr.logipack.repository.*;
import org.rlpr.logipack.repository.Mongo.ClienteMongoRepository;
import org.rlpr.logipack.repository.Mongo.EncomendaMongoRepository;
import java.util.List;


@Service
public class EncomendaService {

    @Autowired
    private EncomendaRepository encomendaRepository;


    @Autowired
    private EncomendaMongoRepository encomendaMongoRepository;

    @Autowired
    private ClienteMongoRepository clienteMongoRepo;


    public Encomenda getEncomendaById(int id) {
        return encomendaRepository.findById(id);
    }

    public EncomendaMongo getEncomendaDetailsById(int id) {
        return encomendaMongoRepository.findByEncomenda(id);
    }

    public List<Encomenda> getAllEncomendas() {
        return encomendaRepository.findAll();
    }

    public Encomenda createEncomenda(Encomenda encomenda) {
        return encomendaRepository.save(encomenda);
    }

    public Encomenda updateEstado(EncomendaEstado estado, int id) {
        return encomendaRepository.updateEstado(estado, id);
    }

    public void confirmarEncomenda(int id) {

        //update in rel db
        Encomenda encomenda = encomendaRepository.findById(id);
        encomenda.setEstado(EncomendaEstado.CONFIRMADA);
        encomendaRepository.save(encomenda);

        //update in mongo
        EncomendaMongo encomendaMongo = encomendaMongoRepository.findByEncomenda(id);
        //EncomendaEstadoMongo newState = new EncomendaEstadoMongo(null, null, false)



    }

    public List<Encomenda> getEncomendasByClienteId(int id) {
        return encomendaRepository.findByDestinatarioId(id);
    }

    public List<NotificacaoCliente> getNotificacoesByCliente(int id) {
        return clienteMongoRepo.findByCliente(id).getNotifications();
    }
}
