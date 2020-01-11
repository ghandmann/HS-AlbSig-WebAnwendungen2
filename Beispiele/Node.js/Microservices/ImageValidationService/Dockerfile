FROM node:10.18.0-alpine3.9

WORKDIR /opt/ImageValidationService/

RUN apk --update add imagemagick

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "app.js" ]