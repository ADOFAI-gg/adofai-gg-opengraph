FROM node:18-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable && pnpm i --frozen-lockfile

COPY . .

RUN pnpm build

CMD pnpm prod
