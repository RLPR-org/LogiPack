import pika

connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
channel = connection.channel()
channel.exchange_declare('test', durable=True, exchange_type='topic')

def callbackFunctionForQueueA(ch,method,properties,body):
    print('Got a message from Queue A: ', body)

channel.basic_consume(queue='A', on_message_callback=callbackFunctionForQueueA, auto_ack=True)


channel.start_consuming()