FROM node:12

WORKDIR /app

COPY package*.json ./
RUN npm cache clean --force

RUN npm install

COPY . /app

EXPOSE 7070

RUN npm run build

CMD ["npm", "run", "deploy"]