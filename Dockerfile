FROM node:alpine

RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY tsconfig.json tsconfig.json
COPY .env ./
COPY src src

CMD npm start