FROM node:18.9.0-alpine3.16 as build
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine as production
COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/src/app
CMD ["nginx", "-g", "daemon off;"]