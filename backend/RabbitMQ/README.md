
To start the RabbitMQ container we can run the following command

-it for interactive, this can be removed later
5672 is the standard port and should be kept this way


# latest RabbitMQ 3.11
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.11-management
