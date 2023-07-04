FROM node:alpine AS build
WORKDIR /client
COPY package*.json .
RUN npm ci
COPY . .
RUN ["npm", "run", "build"]

FROM nginx:alpine
COPY --from=build /client/dist /usr/share/nginx/html
