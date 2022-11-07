# FROM node:19
FROM alpine:latest

WORKDIR /usr/src/nodejs

COPY package*.json ./
COPY . .

EXPOSE 8080

RUN apk add --update nodejs npm
RUN npm install

CMD [ "node", "./bin/www" ]