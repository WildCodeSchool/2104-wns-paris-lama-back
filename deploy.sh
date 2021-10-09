#!/bin/sh
echo "PORT=$PORT"
git fetch origin && git pull
GATEWAY_PORT=$PORT BRANCH_NAME=staging docker-compose -f docker-compose.yml up --build -d
