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

def log(text):
    print(f"{datetime.now()} - {text}")
    sys.stdout.flush()

log("Listening for new emails...")

while True:
    try:
        result, data = mail.uid('search', None, "UNSEEN")
        if data[0].split() == []:
            sleep(60)
            continue

        i = len(data[0].split())
        latest_email_uid = data[0].split()[-1]
        result, email_data = mail.uid('fetch', latest_email_uid, '(RFC822)')
        raw_email = email_data[0][1]
        try:
            raw_email_string = raw_email.decode('utf-8')
        except:
            mail.uid('store', latest_email_uid, '-FLAGS', '(\Seen)')
            log("(Fixing errors) Marking email as not seen")
            sys.stdout.flush()
            continue

        email_message = email.message_from_string(raw_email_string)
        subject = str(email.header.make_header(email.header.decode_header(email_message['Subject'])))

        if subject == "deploy":
            log(f"{datetime.now()} - Deploying...")
            sys.stdout.flush()
            result = os.system("/home/ies/LogiPack/deployment/deploy.sh")
            if result == 0:
                log(f"{datetime.now()} - Deployed successfully")
                sys.stdout.flush()

    except BrokenPipeError:
        log("Connection lost. Trying to reconnect...")
        sys.stdout.flush()
        mail = imaplib.IMAP4_SSL('outlook.office365.com',993)
        mail.login(email_user, email_pass)
        mail.select("inbox")
    sleep(60)
