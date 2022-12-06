package org.rlpr.logipack.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.*;

import org.rlpr.logipack.model.Encomenda;
import org.rlpr.logipack.model.Transportador;
import org.rlpr.logipack.repository.*;
import org.rlpr.logipack.repository.Mongo.EncomendaMongoRepository;
import  org.rlpr.logipack.model.Mongo.EncomendaMongo;
import org.rlpr.logipack.model.Mongo.EstadoMongo;

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
            EstadoMongo estado = mapper.readValue(message, EstadoMongo.class);

            
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
        
        } catch (Exception e) {
            System.out.println(e);
        }

    }
    
}
