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

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
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
        Encomenda encomenda = encomendaRepository.findById(id);
        encomenda.setEstado(estado);
        encomendaRepository.save(encomenda);

        EncomendaEstadoMongo newState = new EncomendaEstadoMongo();
        newState.setEstado(estado.toString());
        newState.setTimestamp(getDate());
        
        EncomendaMongo encomendaMongo = encomendaMongoRepository.findByEncomenda(id);
        encomendaMongo.getHistory().add(newState);
        encomendaMongoRepository.save(encomendaMongo);
        
        return encomenda;
    }

    public Encomenda updateConfirmacao(int id) {
        return encomendaRepository.updateConfirmacao(id);
    }

    public List<Encomenda> getEncomendasByClienteId(int id) {
        return encomendaRepository.findByDestinatarioId(id);
    }

    public List<NotificacaoCliente> getNotificacoesByCliente(int id) {
        return clienteMongoRepo.findByCliente(id).getNotifications();
    }

    public String getDate() {
        DateFormat df = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        Date currentDate = Calendar.getInstance().getTime();        
        String currentDateStr = df.format(currentDate);
        return currentDateStr;
    }
}
