package org.rlpr.logipack.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.*;

import org.rlpr.logipack.model.Encomenda;
import org.rlpr.logipack.repository.*;


@Service
public class LoggingService {

    @Autowired
    private EncomendaRepository encomendaRepo;

    @Autowired
    private LocalizacaoRepository localizacaoRepo;


    public void insertEncomenda(String data) {
        
        try {

            //convert json to POJO
            ObjectMapper mapper = new ObjectMapper();
            Encomenda encomenda = mapper.readValue(data, Encomenda.class);

            //save first the package location
            localizacaoRepo.save(encomenda.getLocalizacao());

            //then save the package
            encomendaRepo.save(encomenda);            
        
        } catch (Exception e) {
            System.out.println("ERROR: error while storing package in the database.");
        }

    }


    public void insertTransportador(String data) {
        
        System.out.printf("[T]  %s\n", data);
        //TODO: insert into db

    }
    
}
