FROM node:9.11.2-alpine
MAINTAINER Yann Piquet <yann.piquet@epitech.eu>

RUN mkdir /app
WORKDIR /app

COPY src/package.json .
RUN yarn

COPY src/public ./public
COPY src/src ./src

CMD yarn start