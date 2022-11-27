import pika
import json


class Sender():

    def  __init__(self,channelName='hello'):
        self.startConnection(channelName=channelName)   

        return


    def startConnection(self,channelName):
        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters(host='localhost'))
            
        self.channel = self.connection.channel()

        # declares the chanel if it doent not exist

        self.channel.exchange_declare("LogiPack", durable=True, exchange_type="topic")
        self.channel.queue_declare(queue= "A")
        self.channel.queue_bind(exchange="LogiPack", queue="A", routing_key="A")


        return
    
    def sendMessage(self,message):

        self.channel.basic_publish(exchange='', routing_key='hello', body=json.dumps(message))

        return



    def closeConnection(self):
        self.connection.close()
        return

        

if __name__== "__main__":

    sender = Sender()

    while True:

        messageText = input("Your message is: ")
        
        if messageText=="exit":
            break
        
        message = {"message": messageText}


        sender.sendMessage(message)    

    sender.closeConnection()