# BACKEND (LOCALHOST)
echo "Stopping and removing all Docker containers"
docker rm -f $(docker ps -a -q)
echo "Building data generator"
cd data_gen
docker build -t logipack-datagen .
echo "Building backend"
cd ../backend
mvn clean install
docker build -t logipack-backend .
docker compose down
docker compose down -v
echo "Booting up backend containers"
docker compose up -d

# FRONTEND (LOCALHOST SEM DOCKER)
echo "REACT_APP_API_HOST = 'localhost'" > .env
npm start
