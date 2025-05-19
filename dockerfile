FROM node

WORKDIR /stormy-server

COPY package.json .

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]	