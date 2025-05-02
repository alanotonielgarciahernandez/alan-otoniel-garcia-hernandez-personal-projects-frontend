FROM node:slim AS build

ARG API_URL

ENV API_URL=$API_URL

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY /default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]