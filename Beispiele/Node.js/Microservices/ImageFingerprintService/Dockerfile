FROM node:10.18.0-alpine3.9

WORKDIR /opt/ImageFingerprintService/

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "app.js" ]