package org.rlpr.logipack.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.*;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.rlpr.logipack.model.Cliente;
import org.rlpr.logipack.model.Encomenda;
import org.rlpr.logipack.model.EncomendaEstado;
import org.rlpr.logipack.model.Transportador;
import org.rlpr.logipack.model.TransportadorEstado;
import org.rlpr.logipack.repository.*;
import org.rlpr.logipack.repository.Mongo.ClienteMongoRepository;
import org.rlpr.logipack.repository.Mongo.EncomendaMongoRepository;
import org.rlpr.logipack.repository.Mongo.HistoricoTemporalRepository;
import org.rlpr.logipack.repository.Mongo.TransportadorMongoRepository;
import  org.rlpr.logipack.model.Mongo.EncomendaMongo;
import org.rlpr.logipack.model.Mongo.HistoricoMeses;
import org.rlpr.logipack.model.Mongo.NotificacaoCliente;
import org.rlpr.logipack.model.Mongo.TransportadorEstadoMongo;
import org.rlpr.logipack.model.Mongo.TransportadorMongo;
import org.rlpr.logipack.model.Mongo.ClienteMongo;
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
    private ClienteRepository clienteRepo;
    
    @Autowired
    private TransportadorMongoRepository transportadorMongoRepo;

    @Autowired
    private ClienteMongoRepository clienteMongoRepo;

    @Autowired
    private HistoricoTemporalRepository historicoTemporalRepo;
    

    public void insertEncomenda(String message) {
        
        System.out.println("Nova encomenda");
        
        try {
            JSONObject messageJSON = new JSONObject(message);
            int emissorId = messageJSON.getInt("emissor");
            int destinatarioId = messageJSON.getInt("destinatario");
            String emissorName = clienteRepo.findById(emissorId).getName();
            String destinatarioName = clienteRepo.findById(destinatarioId).getName();

            //refactor de json message
            messageJSON.put("emissor", emissorName);
            messageJSON.put("destinatario", destinatarioName);
            messageJSON.put("destinatarioId", destinatarioId);
            message = messageJSON.toString();

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

            //add new package to temporal history
            updateTemporalHistory(encomenda.getTimestamp());


            //create and save client notification
            sendNotification(encomenda);

        } catch (Exception e) {
            System.out.println(e);
        }

    }


    public void updateEncomenda(String message) {
        System.out.println("Novo update de encomenda");

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

            //create and save client notification
            sendNotification(encomenda);


        } catch (Exception e) {
            System.out.println(e);
        }

    }


    public void insertTransportador(String message) {
        
        System.out.println("Novo transportador");


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
        System.out.println("Novo update de transportador");

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



    public void insertCliente(String message) {
        
        System.out.println("Novo cliente");

        try {

            //convert json to POJO
            ObjectMapper mapper = new ObjectMapper();
            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            Cliente cliente = mapper.readValue(message, Cliente.class);

            //then save the client
            clienteRepo.save(cliente);

            //create client in mongodb
            ClienteMongo clienteMongo = new ClienteMongo(cliente.getId(), cliente.getName(), cliente.getEmail());
            clienteMongoRepo.save(clienteMongo);
        
        } catch (Exception e) {
            System.out.println(e);
        }

    }


    public void sendNotification(Encomenda encomenda) {

        //get current date
        DateFormat df = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        Date currentDate = Calendar.getInstance().getTime();        
        String currentDateStr = df.format(currentDate);
        
        NotificacaoCliente notification = new NotificacaoCliente(encomenda.getId(), encomenda.getEstado(), currentDateStr);

        //add notification to user in mongodb
        ClienteMongo cliente = clienteMongoRepo.findByCliente(encomenda.getDestinatarioId());
        List<NotificacaoCliente> notificacoes = cliente.getNotifications();
        notificacoes.add(notification);
        clienteMongoRepo.save(cliente);

    }


    public void updateTemporalHistory(String timestamp) {
        String year = timestamp.split(" ")[0].split("/")[0];
        String month = timestamp.split(" ")[0].split("/")[1];
        int day = Integer.parseInt(timestamp.split(" ")[0].split("/")[2]);

        Map<String, HistoricoMeses> history =  historicoTemporalRepo.findAll().get(0).getHistorico_anos();  //0 bc there is only one document

        if (!history.containsKey(year)) {
            history.put(year, new HistoricoMeses());
            HistoricoMeses histMonths = history.get(year);
            histMonths.initilizeMonth(month);
            histMonths.getHistorico_meses().get(month).set(day-1, 1);
        }
        else {
            HistoricoMeses histMonths = history.get(year);

            if (!histMonths.getHistorico_meses().containsKey(month)) {
                histMonths.initilizeMonth(month);
                histMonths.getHistorico_meses().get(month).set(day-1, 1);
            }
            else {
                int total = histMonths.getHistorico_meses().get(month).get(day-1); 
                histMonths.getHistorico_meses().get(month).set(day-1, total+1);
            }
        }

    }
    
}
