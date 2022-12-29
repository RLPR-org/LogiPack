import imaplib
import base64
import os
import sys
import email
from time import sleep
from datetime import datetime

#------------------------------------------------------------

from cryptography.fernet import Fernet
with open('filekey.key', 'rb') as filekey:
    key = filekey.read()
fernet = Fernet(key)
x = "terces"
with open(f"{x[::-1]}.txt", 'rb') as enc_file:
	encrypted = enc_file.read()
decrypted = fernet.decrypt(encrypted)
y = decrypted.decode('utf-8')
z = 'tp.au@gfr'

#------------------------------------------------------------

mail = imaplib.IMAP4_SSL('outlook.office365.com',993)
mail.login(z[::-1], y)
mail.select("inbox")
#print("Listening for new emails...")

while True:
    result, data = mail.uid('search', None, "UNSEEN")
    i = len(data[0].split())

    latest_email_uid = data[0].split()[-1]
    result, email_data = mail.uid('fetch', latest_email_uid, '(RFC822)')
    raw_email = email_data[0][1]
    raw_email_string = raw_email.decode('utf-8')
    email_message = email.message_from_string(raw_email_string)

    # Header Details
    try:
        email_from = str(email.header.make_header(email.header.decode_header(email_message['From'])))
        email_to = str(email.header.make_header(email.header.decode_header(email_message['To'])))
        subject = str(email.header.make_header(email.header.decode_header(email_message['Subject'])))
        #print(subject)
        if subject == "deploy":
            print(f"{datetime.now()} - Deploying...")
            sys.stdout.flush()
            result = os.system("/home/ies/LogiPack/deployment/deploy.sh")
            if result == 0:
                print(f"{datetime.now()} - Deployed successfully")
                sys.stdout.flush()
    except Exception as e:
        print(e)
        pass
    sleep(20)