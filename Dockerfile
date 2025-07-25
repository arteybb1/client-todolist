FROM node:22-alpine AS build-stage

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

# หาไม่เจอ nginx static spa
FROM nginx:alpine
# FROM iamfreee/docker-nginx-static-spa:latest

COPY --from=build-stage /app/dist /usr/share/nginx/html


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
