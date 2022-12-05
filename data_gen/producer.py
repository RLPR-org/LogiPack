import pika
import json
import time

with open("generated/encomendas.json", "r", encoding='utf-8') as f:
    encomendas = json.load(f)

with open("generated/transportadores.json", "r", encoding='utf-8') as f:
    transportadores = json.load(f)

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

channel.queue_declare(queue= "queue_transportadores")
channel.queue_bind(exchange="LogiPack", queue="queue_transportadores", routing_key="queue_transportadores")

while True:
    encomenda = encomendas.pop(0)
    transportador = transportadores.pop(0)
    channel.basic_publish(exchange='LogiPack', routing_key="queue_encomendas", body=json.dumps(encomenda))
    channel.basic_publish(exchange='LogiPack', routing_key="queue_transportadores", body=json.dumps(transportador))
    print(" [x] Sent %r" % encomenda, flush=True)
    print(" [x] Sent %r" % transportador, flush=True)
    time.sleep(30)
