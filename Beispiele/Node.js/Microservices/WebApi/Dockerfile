FROM node:10.18.0-alpine3.9

WORKDIR /opt/ImageWebApi/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]