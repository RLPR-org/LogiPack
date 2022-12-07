package org.rlpr.logipack.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.*;

import org.rlpr.logipack.model.Encomenda;
import org.rlpr.logipack.model.Transportador;
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

            Transportador transportador = transportadorRepo.findById(encomenda.getTransportador());
            transportador.getEncomendas().add(encomenda);
            transportadorRepo.save(transportador);


            //create encomenda in mongodb
            encomendaMongoRepository.save(new EncomendaMongo(encomenda.getId()));
        
        } catch (Exception e) {
            System.out.println(e);
        }

    }


    public void updateEncomenda(String message) {
        System.out.printf("[UE]  %s\n", message);

        try {
            
            //convert json to POJO
            ObjectMapper mapper = new ObjectMapper();
            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            EncomendaEstadoMongo estado = mapper.readValue(message, EncomendaEstadoMongo.class);

            
            //add new state to encomenda history in mongodb
            EncomendaMongo encomenda = encomendaMongoRepository.findByEncomenda(estado.getEncomenda());
            encomenda.getHistory().add(estado);
            encomendaMongoRepository.save(encomenda);
        
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
            transportadorMongoRepo.save(new TransportadorMongo(transportador.getId()));
        
        } catch (Exception e) {
            System.out.println(e);
        }

    }


    public void updateTransportador(String message) {
        System.out.printf("[UT]  %s\n", message);

        try {
            
            //convert json to POJO
            ObjectMapper mapper = new ObjectMapper();
            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            TransportadorEstadoMongo estado = mapper.readValue(message, TransportadorEstadoMongo.class);

            
            //add new state to transportadores history in mongodb
            TransportadorMongo transportador = transportadorMongoRepo.findByTransportador(estado.getTransportador());
            transportador.getHistory().add(estado);
            transportadorMongoRepo.save(transportador);

        } catch (Exception e) {
            System.out.println(e);
        }

    }
    
}
