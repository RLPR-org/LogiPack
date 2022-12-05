import random
import faker
import datetime

fnames = open("static/fnames.txt", "r", encoding='utf-8').readlines()
lnames = open("static/lnames.txt", "r", encoding='utf-8').readlines()
fake = faker.Faker()

print("INFO: Initializing data generation...")

transportadores = []

with open("generated/transportadores.json", "w", encoding='utf-8') as f:
    f.write("[\n")
    for i in range(100):
        name = f"{random.choice(fnames).strip()} {random.choice(lnames).strip()}"
        transportador = {
            "type": "insert",
            "id": i,
            "nome": name,
            "email": name.replace(" ", "").lower() + "@ua.pt",
            "telefone": fake.phone_number(),
            "matricula": fake.license_plate(),
            "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        transportadores.append(transportador)
        f.write("\t" + str(transportador).replace("'", '"') + ",\n")

    for i in range(50):
        registo = transportadores[i]
        name = registo["nome"] if random.random() > 0.8 else f"{random.choice(fnames).strip()} {random.choice(lnames).strip()}"
        email = name.replace(" ", "").lower() + "@ua.pt"
        transportador = {
            "type": "update",
            "id": i,
            "nome": name,
            "email": email,
            "telefone": registo["telefone"] if random.random() > 0.8 else fake.phone_number(),
            "matricula": registo["matricula"] if random.random() > 0.8 else fake.license_plate(),
            "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        f.write("\t" + str(transportador).replace("'", '"'))
        if i != 49:
            f.write(",")
        f.write("\n")
    f.write("]")

print("INFO: Data generation complete!")
print("INFO: Wrote data to transportadores.json")