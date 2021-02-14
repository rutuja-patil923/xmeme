#!/bin/bash


cd src/backend


# Setup DB or any other environment variables you want to setup.


npm install
npm cache clean -f
npm install -g n
sudo n latest

node index.js