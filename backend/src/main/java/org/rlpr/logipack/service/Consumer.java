package org.rlpr.logipack.service;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class Consumer {

    @Autowired
    private LoggingService loggingService;

    
    @RabbitListener(queues = "${rabbitmq.queues.encomendas}")
    public void consumeEncomendas(String message){        
        loggingService.insertEncomenda(message);
    }


    @RabbitListener(queues = "${rabbitmq.queues.transportadores}")
    public void consumeTransportadores(String message){
        loggingService.insertTransportador(message);
    }

}
