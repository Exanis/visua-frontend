FROM node:9.11.2-alpine
MAINTAINER Yann Piquet <yann.piquet@epitech.eu>

RUN mkdir /app
WORKDIR /app

COPY src/package.json .
COPY src/.babelrc .
RUN yarn

COPY src/public ./public
COPY src/src ./src
COPY src/scripts ./scripts
COPY src/config ./config

CMD yarn start