#!/bin/bash


#installation commands
sudo apt-get update -y && sudo apt-get dist-upgrade -y


# commands for installation of DB
wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod

#command for installing nodejs
sudo apt-get install nodejs npm

sudo fuser -k 8080/tcp
