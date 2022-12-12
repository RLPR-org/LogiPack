package org.rlpr.logipack.service;

import org.json.JSONObject;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class Consumer {

    @Autowired
    private LoggingService loggingService;

    
    @RabbitListener(queues = "${rabbitmq.queues.logipack}")
    public void consume(String message){       
        
        JSONObject jsonMessage = new JSONObject(message);
        String entity = jsonMessage.getString("entity");
        String type = jsonMessage.getString("type");

        switch (entity) {
            case "cliente":
                dispatcherClient(type, message);
                break;

            case "transportador":
                dispatcherTransportador(type, message);
                break;

            case "encomenda":
                dispatcherEncomenda(type, message);
                break;
        
            default:
                System.out.println("UNKNOWN EVENT");
        }
    


    }

    public void dispatcherClient(String type, String message) {
        switch (type) {
            case "insert":
                loggingService.insertCliente(message);
                break;
            default:
                System.out.println("UNKNOWN EVENT");
        }
    }


    public void dispatcherTransportador(String type, String message) {
        switch (type) {
            case "insert":
                loggingService.insertTransportador(message);
                break;

            case "update":
                loggingService.updateTransportador(message);
                break;
        
            default:
                System.out.println("UNKNOWN EVENT");
        }
    }

    public void dispatcherEncomenda(String type, String message) {
        switch (type) {
            case "insert":
                loggingService.insertEncomenda(message);
                break;

            case "update":
                loggingService.updateEncomenda(message);
                break;
        
            default:
                System.out.println("UNKNOWN EVENT");
        }
    }


}
