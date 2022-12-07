package org.rlpr.logipack.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.rlpr.logipack.model.*;
import org.rlpr.logipack.model.Mongo.TransportadorMongo;
import org.rlpr.logipack.repository.*;
import org.rlpr.logipack.repository.Mongo.TransportadorMongoRepository;

import java.util.List;

@Service
public class TransportadorService {

    @Autowired
    private TransportadorRepository transportadorRepository;

    @Autowired
    private TransportadorMongoRepository transportadorMongoRepository;


    public Transportador getTransportadorById(int id) {
        return transportadorRepository.findById(id);
    }

    public TransportadorMongo getTransportadorDetailsById(int id) {
        return transportadorMongoRepository.findByTransportador(id);
    }

    public List<Transportador> getAllTransportadores() {
        return transportadorRepository.findAll();
    }

    public Transportador createTransportador(Transportador transportador) {
        return transportadorRepository.save(transportador);
    }

    public Transportador updateEstado(TransportadorEstado estado, int id) {
        return transportadorRepository.updateEstado(estado, id);
    }
}
