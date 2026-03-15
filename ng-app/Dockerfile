#stage 1
FROM node:18.20-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build --prod

EXPOSE 4200 49153