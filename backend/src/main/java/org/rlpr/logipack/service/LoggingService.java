package org.rlpr.logipack.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.*;

import org.json.JSONObject;
import org.rlpr.logipack.model.Encomenda;
import org.rlpr.logipack.model.EncomendaEstado;
import org.rlpr.logipack.model.Transportador;
import org.rlpr.logipack.model.TransportadorEstado;
import org.rlpr.logipack.repository.*;
import org.rlpr.logipack.repository.Mongo.EncomendaMongoRepository;
import org.rlpr.logipack.repository.Mongo.TransportadorMongoRepository;
import  org.rlpr.logipack.model.Mongo.EncomendaMongo;
import org.rlpr.logipack.model.Mongo.TransportadorEstadoMongo;
import org.rlpr.logipack.model.Mongo.TransportadorMongo;
import org.rlpr.logipack.model.Mongo.EncomendaEstadoMongo;

@Service
public class LoggingService {
    
    @Autowired
    private EncomendaRepository encomendaRepo;
    
    @Autowired
    private LocalizacaoRepository localizacaoRepo;
    
    @Autowired
    private TransportadorRepository transportadorRepo;
    
    @Autowired
    private EncomendaMongoRepository encomendaMongoRepository;
    
    @Autowired
    private TransportadorMongoRepository transportadorMongoRepo;
    

    public void insertEncomenda(String message) {
        
        System.out.printf("[E]  %s\n", message);
        
        try {
            
            //convert json to POJO
            ObjectMapper mapper = new ObjectMapper();
            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);  //ignore "type" field
            Encomenda encomenda = mapper.readValue(message, Encomenda.class);

            //save first the package location
            localizacaoRepo.save(encomenda.getLocalizacao());

            //then save the package
            encomendaRepo.save(encomenda);

            //add it to transportador
            Transportador transportador = transportadorRepo.findById(encomenda.getTransportador());
            transportador.getEncomendas().add(encomenda);
            transportadorRepo.save(transportador);

            //create encomenda in mongodb
            EncomendaMongo encomendaMongo = new EncomendaMongo(encomenda.getId());
            encomendaMongo.initalizeHistory(encomenda.getTimestamp());
            encomendaMongoRepository.save(encomendaMongo);
        
        } catch (Exception e) {
            System.out.println(e);
        }

    }


    public void updateEncomenda(String message) {
        System.out.printf("[UE]  %s\n", message);

        try {

            JSONObject messageJSON = new JSONObject(message);
            
            //convert json to POJO
            ObjectMapper mapper = new ObjectMapper();
            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            EncomendaEstadoMongo estado = mapper.readValue(message, EncomendaEstadoMongo.class);

            
            //add new state to encomenda history in mongodb
            EncomendaMongo encomendaMongo = encomendaMongoRepository.findByEncomenda(messageJSON.getInt("encomenda"));
            encomendaMongo.getHistory().add(estado);
            encomendaMongoRepository.save(encomendaMongo);


            //update encomenda state in relational DB (it will be only the last state)
            Encomenda encomenda = encomendaRepo.findById(messageJSON.getInt("encomenda"));
            encomenda.setEstado(EncomendaEstado.valueOf(estado.getEstado()));
            encomenda.setTimestamp(estado.getTimestamp());
            encomendaRepo.save(encomenda);


        } catch (Exception e) {
            System.out.println(e);
        }

    }


    public void insertTransportador(String message) {
        
        System.out.printf("[T]  %s\n", message);


        try {

            //convert json to POJO
            ObjectMapper mapper = new ObjectMapper();
            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            Transportador transportador = mapper.readValue(message, Transportador.class);

            //then save the carrier
            transportadorRepo.save(transportador);

            //create transportador in mongodb
            TransportadorMongo transportadorMongo = new TransportadorMongo(transportador.getId());
            transportadorMongo.initalizeHistory(transportador.getTimestamp());
            transportadorMongoRepo.save(transportadorMongo);
        
        } catch (Exception e) {
            System.out.println(e);
        }

    }


    public void updateTransportador(String message) {
        System.out.printf("[UT]  %s\n", message);

        try {

            JSONObject messageJSON = new JSONObject(message);
            
            //convert json to POJO
            ObjectMapper mapper = new ObjectMapper();
            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            TransportadorEstadoMongo estado = mapper.readValue(message, TransportadorEstadoMongo.class);

            
            //add new state to transportadores history in mongodb
            TransportadorMongo transportadorMongo = transportadorMongoRepo.findByTransportador(messageJSON.getInt("transportador"));
            transportadorMongo.getHistory().add(estado);
            transportadorMongoRepo.save(transportadorMongo);

            //update transportador in the relational db
            Transportador transportador = transportadorRepo.findById(messageJSON.getInt("transportador"));
            transportador.setEstado(TransportadorEstado.valueOf(estado.getEstado()));
            transportador.setTimestamp(estado.getTimestamp());
            transportadorRepo.save(transportador);

        } catch (Exception e) {
            System.out.println(e);
        }

    }
    
}
