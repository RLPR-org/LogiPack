import random
import datetime
import requests

STATES = ["EM_ESPERA", "EM_TRANSITO", "ENTREGUE", "EM_DISTRIBUICAO"]

fnames = open("static/fnames.txt", "r", encoding='utf-8').readlines()
lnames = open("static/lnames.txt", "r", encoding='utf-8').readlines()
locations = open("static/locations.txt", "r", encoding='utf-8').readlines()

print("INFO: Initializing data generation...")

encomendas = []

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


with open("generated/encomendas.json", "w", encoding='utf-8') as f:
    f.write("[\n")
    for i in range(100):
        line = random.choice(locations).strip().split(",")
        location = get_location(line)
        encomenda = {
            "id": i,
            "estado": random.choice(STATES),
            "emissor": f"{random.choice(fnames).strip()} {random.choice(lnames).strip()}",
            "destinatario": f"{random.choice(fnames).strip()} {random.choice(lnames).strip()}",
            "localizacao": location,
            "peso": 1 + random.random() * 100,
            "transportador_id": random.randint(0, 100),
            "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        print(encomenda)
        f.write("\t" + str(encomenda).replace("'", '"'))
        if i != 99:
            f.write(",")
        f.write("\n")
        encomendas.append(encomendas)
    f.write("]")

print("INFO: Data generation complete!")
print("INFO: Wrote data to encomendas.json")