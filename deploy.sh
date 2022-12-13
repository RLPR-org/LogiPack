# Deployment workflow

echo "Stopping and removing all Docker containers"
docker rm -f $(docker ps -a -q)
echo "Building frontend"
cd frontend
echo "REACT_APP_API_HOST = '192.168.160.224'" > .env
docker build -t logipack_frontend .
echo "Building data generator"
cd ../data_gen
docker build -t logipack_datagen .
echo "Building backend"
cd ../backend
mvn clean install
docker build -t logipack_backend .
docker compose down
docker compose down -v
echo "Booting up backend containers"
docker compose up -d
echo "Booting up frontend container"
cd ../frontend
docker run --name logipack-frontend -p 3000:3000 --rm -d logipack-frontend:latest