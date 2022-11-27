# set working directory
FROM python:3.10-alpine3.15

WORKDIR /app

# install app dependencies
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .
CMD ["python", "producer.py"]