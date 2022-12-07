import pika
import json
import time

with open("dataset.json", "r", encoding='utf-8') as f:
    registos = json.load(f)

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
    registo = registos.pop(0)
    prox_registo = registos[0]
    if "encomenda" in registo:
        channel.basic_publish(exchange='LogiPack', routing_key="queue_encomendas", body=json.dumps(registo))
        print(" [x] Sent %r" % registo, flush=True)
        if "encomenda" not in prox_registo: # é um novo transportador
            time.sleep(10)
            continue
        time.sleep(1)
    else:
        channel.basic_publish(exchange='LogiPack', routing_key="queue_transportadores", body=json.dumps(registo))
        print(" [x] Sent %r" % registo, flush=True)
        time.sleep(1)
