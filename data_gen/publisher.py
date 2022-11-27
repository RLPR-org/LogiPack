import pika
import json

connection = pika.BlockingConnection(pika.ConnectionParameters(host="localhost"))
channel = connection.channel()

channel.exchange_declare("LogiPack", durable=True, exchange_type="topic")

channel.queue_declare(queue= "A")
channel.queue_bind(exchange="LogiPack", queue="A", routing_key="A")

# # TODO: Add more queues and routing keys here

message = {"message": "Hello World!"}

channel.basic_publish(exchange='LogiPack', routing_key="A", body=json.dumps(message))
print(" [x] Sent %r" % message)
connection.close()