package org.rlpr.logipack.config;


import org.springframework.amqp.core.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class RabbitMQConfig {

    // CONTEXT METHODS

    @Value("${rabbitmq.queues.logipack}")
    private String queueLogipack;

    @Value("${rabbitmq.exchange}")
    private String exchange;

    @Value("${rabbitmq.routing.keys.logipack}")
    private String routingKeyLogipack;


    //QUEUES

    @Bean
    public Queue queueLogipack(){
        return new Queue(queueLogipack, false);
    }


    @Bean
    public TopicExchange exchange(){
        return new TopicExchange(exchange);
    }



    // binding between queue and exchange using routing key

    @Bean
    public Binding bindingEncomendas(){
        return BindingBuilder
            .bind(queueLogipack())
            .to(exchange())
            .with(routingKeyLogipack);
    }

}
