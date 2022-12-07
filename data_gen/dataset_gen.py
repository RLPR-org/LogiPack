import random
import datetime
import requests
import faker

PACKAGES_STATES = ["EM_TRANSITO", "ENTREGUE", "EM_DISTRIBUICAO"]

fnames = open("static/fnames.txt", "r", encoding='utf-8').readlines()
lnames = open("static/lnames.txt", "r", encoding='utf-8').readlines()
locations = open("static/locations.txt", "r", encoding='utf-8').readlines()

fake = faker.Faker('pt_PT')

print("INFO: Initializing data generation...")

def get_location(data):
    distrito = data[0]
    concelho = data[1]
    freguesia = "".join(a + "," for a in data[2:])[:-1]
    location_data = requests.get(url = 'https://json.geoapi.pt/freguesia/' + freguesia).json()
    
    if 'erro' in location_data:
        rua, codigopostal = None, None
    elif type(location_data) == list:
        location_data = location_data[0]

    rua, codigopostal = location_data['rua'], location_data['codigopostal']

    return {
        "distrito": distrito,
        "concelho": concelho,
        "freguesia": freguesia,
        "rua": rua,
        "codigopostal": codigopostal
    }


transportadores = []
encomendas = {}

def update_encomendas(f, estado_encomenda, estado_transportador=None):
    transportadores_copy = transportadores.copy()
    random.shuffle(transportadores_copy)
    while len(transportadores_copy) > 0:
        transportador = transportadores_copy.pop(0)
        if estado_transportador is not None:
            transportador_up = {
                "type": "update",
                "transportador": transportador["transportador"],
                "estado": estado_transportador,
                "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            }
            f.write("\t" + str(transportador_up).replace("'", '"') + ",\n")
        encomendas_t = encomendas[transportador["transportador"]].copy()
        random.shuffle(encomendas_t)
        while len(encomendas_t) > 0:
            encomenda = encomendas_t.pop(0)
            encomenda = {
                "type": "update",
                "encomenda": encomenda["encomenda"],
                "transportador": transportador["transportador"],
                "estado": estado_encomenda,
                "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "confirmacao": 1
            }
            f.write("\t" + str(encomenda).replace("'", '"'))
            if len(encomendas_t) == 0 and len(transportadores_copy) == 0:
                continue
            f.write(",\n")

with open("dataset.json", "w", encoding='utf-8') as f:
    f.write("[\n")
    n_encomendas = 1
    for i in range(1, 21):
        name = f"{random.choice(fnames).strip()} {random.choice(lnames).strip()}"
        transportador = {
            "type": "insert",
            "transportador": i,
            "nome": name,
            "email": name.replace(" ", "").lower() + "@ua.pt",
            "telefone": fake.phone_number(),
            "matricula": fake.license_plate(),
            "estado": "INATIVO",
            "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        transportadores.append(transportador)
        f.write("\t" + str(transportador).replace("'", '"') + ",\n")

        line = random.choice(locations).strip().split(",")
        location = get_location(line)
        encomendas[i] = []
        for j in range(1, random.randint(2, 20)):
            encomenda = {
                "type": "insert",
                "encomenda": n_encomendas,
                "estado": "REGISTADA",
                "emissor": f"{random.choice(fnames).strip()} {random.choice(lnames).strip()}",
                "destinatario": f"{random.choice(fnames).strip()} {random.choice(lnames).strip()}",
                "localizacao": location,
                "peso": 1 + random.random() * 100,
                "transportador": i,
                "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "confirmacao": 0
            }
            n_encomendas += 1
            encomendas[i].append(encomenda)
            f.write("\t" + str(encomenda).replace("'", '"') + ",\n")

    update_encomendas(f, "EM_TRANSITO", "EM_TRANSITO")
    f.write(",\n")
    update_encomendas(f, "EM_DISTRIBUICAO")
    f.write(",\n")
    update_encomendas(f, "ENTREGUE", "PARADO")
    f.write("\n]")

print("INFO: Data generation complete!")
print("INFO: Wrote data to dataset.json")

with open("dataset.json", "r", encoding='utf-8') as f:
    data = f.read().replace("\\xa0", " ")

with open("dataset.json", "w", encoding='utf-8') as f:
    f.write(data)

print("INFO: Fixed encoding issues")