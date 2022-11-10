FROM node:alpine

WORKDIR /usr/src/app

COPY . .

# EXPOSE 8080

# RUN apk add --update nodejs npm redis
RUN npm install

CMD [ "npm", "start" ]
# CMD [ "node", "./bin/www" ]
# CMD [ "npm", "run", "server" ]