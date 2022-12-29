import imaplib
import base64
import os
import sys
import email
from time import sleep
from datetime import datetime

email_user = "logipack-cd@outlook.pt"
email_pass = "rlpr2022"

mail = imaplib.IMAP4_SSL('outlook.office365.com',993)
mail.login(email_user, email_pass)
mail.select("inbox")
#print("Listening for new emails...")

while True:
    result, data = mail.uid('search', None, "UNSEEN")
    if data[0].split() == []:
        #print(f"{datetime.now()} - No new emails")
        sleep(10*60)
        continue

    i = len(data[0].split())
    latest_email_uid = data[0].split()[-1]
    result, email_data = mail.uid('fetch', latest_email_uid, '(RFC822)')
    raw_email = email_data[0][1]
    try:
        raw_email_string = raw_email.decode('utf-8')
    except:
        mail.uid('store', latest_email_uid, '-FLAGS', '(\Seen)')
        print("(Fixing errors) Marking email as not seen")
        sys.stdout.flush()
        continue
    email_message = email.message_from_string(raw_email_string)

    # Header Details
    try:
        email_from = str(email.header.make_header(email.header.decode_header(email_message['From'])))
        email_to = str(email.header.make_header(email.header.decode_header(email_message['To'])))
        subject = str(email.header.make_header(email.header.decode_header(email_message['Subject'])))
        print(subject)
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
    sleep(10*60)
