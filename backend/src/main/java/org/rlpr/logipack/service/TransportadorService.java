package org.rlpr.logipack.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.rlpr.logipack.model.*;
import org.rlpr.logipack.model.Mongo.*;
import org.rlpr.logipack.repository.*;
import org.rlpr.logipack.repository.Mongo.TransportadorMongoRepository;


import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
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
        Transportador transportador = transportadorRepository.findById(id);
        transportador.setEstado(estado);
        transportadorRepository.save(transportador);

        TransportadorEstadoMongo transportadorEstado = new TransportadorEstadoMongo();
        transportadorEstado.setEstado(estado.toString());
        transportadorEstado.setTimestamp(getDate());

        TransportadorMongo transportadorMongo = transportadorMongoRepository.findByTransportador(id);
        transportadorMongo.getHistory().add(transportadorEstado);
        transportadorMongoRepository.save(transportadorMongo);


        return transportador;
    }



    public String getDate() {
        DateFormat df = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        Date currentDate = Calendar.getInstance().getTime();        
        String currentDateStr = df.format(currentDate);
        return currentDateStr;
    }
}
