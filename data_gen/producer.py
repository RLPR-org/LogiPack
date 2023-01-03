import pika
import json
import time
import random

with open("dataset.json", "r", encoding='utf-8') as f:
    registos_src = json.load(f)

while True:
    try:
        connection = pika.BlockingConnection(pika.ConnectionParameters(host='rabbitmq'))
        break
    except:
        time.sleep(1)

print("Connected to RabbitMQ-----------------------------", flush=True)

channel = connection.channel()

channel.exchange_declare("LogiPack", durable=True, exchange_type="topic")

channel.queue_declare(queue= "queue_logipack")
channel.queue_bind(exchange="LogiPack", queue="queue_logipack", routing_key="queue_logipack")

registos = []
while True:
    if not registos:
        registos = registos_src.copy()
        print("Starting queue [~10 seconds]...", flush=True)
        time.sleep(10)
    registo = registos.pop(0)
    prox_registo = registos[0]
    channel.basic_publish(exchange='LogiPack', routing_key="queue_logipack", body=json.dumps(registo))
    if registo["entity"] == "cliente":
        print(" [x] (Cliente) Sent %r" % registo, flush=True)
    elif registo["entity"] == "encomenda":
        print(" [x] (Encomenda) Sent %r" % registo, flush=True)
        if prox_registo["entity"] == "transportador":
            time.sleep(random.randint(5, 20) * 60)
            continue
        time.sleep(random.randint(5, 20) * 60)
    else:
        print(" [x] (Transportador) Sent %r" % registo, flush=True)
        time.sleep(random.randint(5, 20) * 60)
