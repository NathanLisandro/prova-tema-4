FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

COPY .env.prod .env

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]