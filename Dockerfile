FROM node:10
WORKDIR /usr/src/catalog-service
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "node", "app.js" ]
