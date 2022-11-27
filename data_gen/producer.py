import pika
import json
import time

while True:
    try:
        connection = pika.BlockingConnection(pika.ConnectionParameters(host='rabbitmq'))
        break
    except:
        time.sleep(1)

print("Connected to RabbitMQ-----------------------------", flush=True)

channel = connection.channel()

channel.exchange_declare("LogiPack", durable=True, exchange_type="topic")

channel.queue_declare(queue= "A")
channel.queue_bind(exchange="LogiPack", queue="A", routing_key="A")

# # TODO: Add more queues and routing keys here

encomenda = {
    "id": 1,
    "estado": "EM_ESPERA",
    "emissor": "Rafael",
    "destinatario": "Pedro",
    "peso": 200.3,
    "transportador_id": 1
}

while True:
    channel.basic_publish(exchange='LogiPack', routing_key="A", body=json.dumps(encomenda))
    print(" [x] Sent %r" % encomenda, flush=True)
    time.sleep(30)

# connection.close()