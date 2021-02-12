#!/bin/bash

cd backend

# Setup DB or any other environment variables you want to setup.

sudo systemctl start mongod.service
npm install
npm start
