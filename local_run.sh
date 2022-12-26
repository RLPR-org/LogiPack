# Check arguments
if [ $# -ne 2 ]; then
    echo "Usage: $0 <backend_host> <with_frontend_bool>"
    exit 1
fi

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
if [ $2 = "false" ]; then
    echo "Skipped frontend"
    exit 0
fi
cd ../frontend
echo "REACT_APP_API_HOST = '$1'" > .env
npm start
