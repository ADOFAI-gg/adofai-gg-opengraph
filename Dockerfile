FROM node:18-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package.json yarn.lock ./

RUN corepack enable && yarn --frozen-lockfile

COPY . .

RUN yarn build

CMD yarn prod
