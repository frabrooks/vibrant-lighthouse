#stage 1
FROM node:alpine as node

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build --prod

EXPOSE 4200 49153