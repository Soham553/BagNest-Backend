FROM node:20 AS build

WORKDIR /app

COPY . /app

CMD ["node" "index.js"]