package org.rlpr.logipack.service;

import org.json.JSONObject;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class Consumer {

    @Autowired
    private LoggingService loggingService;

    
    @RabbitListener(queues = "${rabbitmq.queues.encomendas}")
    public void consumeEncomendas(String message){       
        
        JSONObject jsonMessage = new JSONObject(message);
        String type = jsonMessage.getString("type");

        switch (type) {
            case "insert":
                loggingService.insertEncomenda(message);
                break;

            case "update":
                loggingService.updateEncomenda(message);
                break;
        
            default:
                System.out.println("Not insert, TODO");
        }
    }


    @RabbitListener(queues = "${rabbitmq.queues.transportadores}")
    public void consumeTransportadores(String message){

        JSONObject jsonMessage = new JSONObject(message);
        String type = jsonMessage.getString("type");

        switch (type) {
            case "insert":
                loggingService.insertTransportador(message);
                break;

            case "update":
                loggingService.updateTransportador(message);
                break;
        
            default:
                System.out.println("Not insert, TODO");
        }

    }


    
    @RabbitListener(queues = "${rabbitmq.queues.clientes}")
    public void consumeClientes(String message){       
        
        JSONObject jsonMessage = new JSONObject(message);
        String type = jsonMessage.getString("type");

        switch (type) {
            case "insert":
                loggingService.insertCliente(message);
                break;

            case "confirm":
                System.out.println("TODO");
                break;
        
            default:
                System.out.println("Unknown, TODO");
        }
    }

}
