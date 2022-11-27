import pika


class Sender():

    def  __init__(self,channelName='hello'):
        self.startConnection(channelName=channelName)   

        return


    def startConnection(self,channelName):
        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters(host='localhost'))
        self.channel = self.connection.channel()

        # declares the chanel if it doent not exist
        self.channel.queue_declare(queue=channelName)

        return
    
    def sendMessage(self,MessageBody):

        self.channel.basic_publish(exchange='', routing_key='hello', body=MessageBody)

        return



    def closeConnection(self):
        self.connection.close()
        return

if __name__== "__main__":

    sender = Sender()

    while True:

        message = input("Your message is: ")
        
        if message=="exit":
            break

        sender.sendMessage(message)    

    sender.closeConnection()