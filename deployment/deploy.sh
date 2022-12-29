cd ../ # Go to project root folder

# Deployment workflow
echo "Pulling latest changes from GitHub"
git pull origin main
echo "Stopping and removing all Docker containers / pm2 processes"
pm2 kill > /dev/null 2>&1
pm2 delete npm > /dev/null 2>&1
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
echo "Booting up frontend"
cd ../frontend
echo "REACT_APP_API_HOST = '192.168.160.224'" > .env
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
nvm install node # guarantee that the latest version of node is installed
pm2 start npm -- start
echo "Done!"