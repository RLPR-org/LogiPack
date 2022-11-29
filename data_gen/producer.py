import pika
import json
import time

with open("generated/encomendas.json", "r", encoding='utf-8') as f:
    encomendas = json.load(f)

while True:
    try:
        connection = pika.BlockingConnection(pika.ConnectionParameters(host='rabbitmq'))
        break
    except:
        time.sleep(1)

print("Connected to RabbitMQ-----------------------------", flush=True)

channel = connection.channel()

channel.exchange_declare("LogiPack", durable=True, exchange_type="topic")

channel.queue_declare(queue= "queue_encomendas")
channel.queue_bind(exchange="LogiPack", queue="queue_encomendas", routing_key="queue_encomendas")

while True:
    for encomenda in encomendas:
        channel.basic_publish(exchange='LogiPack', routing_key="queue_encomendas", body=json.dumps(encomenda))
        print(" [x] Sent %r" % encomenda, flush=True)
        time.sleep(30)
