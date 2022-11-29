package org.rlpr.logipack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;



import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.amqp.rabbit.listener.adapter.MessageListenerAdapter;
import org.springframework.context.annotation.Bean;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


import org.rlpr.logipack.receiver.Receiver;

@SpringBootApplication
public class LogipackApplication {

	static final String topicExchangeName = "LogiPack";

	@Bean
	Queue queue1() {return new Queue("queue_encomendas", false);}
	//Queue queue2() {return new Queue("queue_transportadores", false);}

	@Bean
	TopicExchange exchange() {
		return new TopicExchange(topicExchangeName);
	}

	@Bean
	Binding binding(Queue queue, TopicExchange exchange) {
		return BindingBuilder.bind(queue).to(exchange).with("*");
	}

	@Bean
	SimpleMessageListenerContainer container(ConnectionFactory connectionFactory, MessageListenerAdapter listenerAdapter) {
		SimpleMessageListenerContainer container = new SimpleMessageListenerContainer();
		container.setConnectionFactory(connectionFactory);
		//container.setQueueNames("queue_encomendas", "queue_transportadores");
		container.setQueueNames("queue_encomendas");
		container.setMessageListener(listenerAdapter);
		return container;
	}
  
	@Bean
	MessageListenerAdapter listenerAdapter(Receiver receive) {
	  return new MessageListenerAdapter(receive, "listen");
	}




	public static void main(String[] args) {
		SpringApplication.run(LogipackApplication.class, args);
	}


	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/encomendas").allowedOrigins("http://localhost:8080");
			}
		};
	}

}
