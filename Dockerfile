FROM node:24-alpine

WORKDIR /usr/src/app

COPY package.json bun.lock ./

RUN bun ci

COPY . .

CMD ["sh", "-c", "npm run db:migrate && npm start"]
